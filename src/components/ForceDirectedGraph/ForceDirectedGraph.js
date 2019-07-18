// libs
import React from 'react'
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
} from 'd3-force'

// src
import ForceDirectedGraphInner from './ForceDirectedGraphInner'
import { forceCluster } from './utils'

class ForceDirectedGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: props.nodes,
      links: props.links,
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
          .strength(0.04),
      )
      .force('charge', forceManyBody())
      .force('center', forceCenter(width / 2, height / 2))
      .force('cluster', forceCluster())

    this.force.on('tick', () =>
      this.setState(() => ({
        links: this.state.links,
        nodes: this.state.nodes,
      })),
    )
  }

  componentWillUnmount() {
    this.force.stop()
  }

  render() {
    const { width, height } = this.props
    const { links, nodes } = this.state
    console.log(nodes)

    return (
      <ForceDirectedGraphInner
        width={width}
        height={height}
        links={links}
        nodes={nodes}
      />
    )
  }
}

ForceDirectedGraph.defaultProps = {
  linkDistance: 30,
}
export default ForceDirectedGraph
