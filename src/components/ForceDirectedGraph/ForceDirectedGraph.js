// libs
import React from 'react'
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
} from 'd3-force'

// src
import { createClusters, forceCluster } from './utils'
import ForceDirectedGraphInner from './ForceDirectedGraphInner'

class ForceDirectedGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: props.nodes,
      links: props.links,
      clusters: [],
    }
  }

  componentDidMount() {
    const { width, height } = this.props
    const { links, nodes } = this.state

    this.force = forceSimulation(nodes)
      .force(
        'link',
        forceLink(links)
          .id(({ data }) => data.id)
          .strength(0.002),
      )
      .force('charge', forceManyBody())
      .force('center', forceCenter(width / 2, height / 2))
      .force('cluster', forceCluster())
      .tick(300)

    this.force.on('tick', () =>
      this.setState(() => ({
        clusters: createClusters(nodes),
      })),
    )
  }

  componentWillUnmount() {
    this.force.stop()
  }

  render() {
    const { links, nodes, clusters } = this.state
    const { onMouseMove, onMouseLeave } = this.props

    return (
      <ForceDirectedGraphInner
        links={links}
        nodes={nodes}
        clusters={clusters}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />
    )
  }
}

ForceDirectedGraph.defaultProps = {
  linkDistance: 30,
}

export default ForceDirectedGraph
