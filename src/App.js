// libs
import React from 'react'
import ReactTooltip from 'react-tooltip'

// src
import ForceDirectedGraph from './ForceDirectedGraph'
import linksData from './data/links.json'
import nodesData from './data/nodes.json'

const filterData = data => {
  const nodes = data.nodes.reduce((final, node) => {
    return {
      ...final,
      [node.id]: node,
    }
  }, {})
  const filteredLinks = data.links.filter(({ source, target }) => {
    const isSourceCorrect = Boolean(nodes[source])
    const isTargetCorrect = Boolean(nodes[target])

    return isSourceCorrect && isTargetCorrect
  })
  const filteredNodes = filteredLinks.reduce((final, { source, target }) => {
    return [...final, nodes[source], nodes[target]]
  }, [])

  return { links: filteredLinks, nodes: filteredNodes }
}

const data = { nodes: nodesData, links: linksData }
const filteredData = filterData(data)

export default class ForceDirectedExample extends React.Component {
  state = {
    strength: Math.random() * 60 - 30,
  }

  render() {
    const { strength } = this.state

    console.log(filteredData, linksData.length)

    return (
      <div className="force-directed-example">
        <button
          className="showcase-button"
          onClick={() => this.setState({ strength: Math.random() * 60 - 30 })}
        >
          {' Reweight '}
        </button>
        <ForceDirectedGraph
          data={filteredData}
          height={window.innerHeight}
          width={window.innerHeight}
          animation
          strength={strength}
        />
        <ReactTooltip type="info" effect="solid" />
      </div>
    )
  }
}
