// libs
import React from 'react'
import { ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force'
import ReactTooltip from 'react-tooltip'

// src
import linksData from './data/links.json'
import nodesData from './data/nodes.json'
import { filterData, getColor } from './utils'

const data = filterData({ nodes: nodesData, links: linksData })

export default function ForceDirectedExample() {
  console.log(data)
  const { nodes, links } = data

  return (
    <div className="force-directed-example">
      <ForceGraph
        simulationOptions={{
          height: window.innerHeight,
          width: window.innerHeight,
          animate: true,
          radiusMargin: 200,
          velocityDecay: 1.02,
        }}
      >
        {nodes.map((node, index) => (
          <ForceGraphNode
            key={node.id + index}
            data-tip={node.title}
            node={node}
            fill={getColor(node)}
          />
        ))}
        {links.map((link, index) => (
          <ForceGraphLink
            key={`${link.source}${link.target}${index}`}
            link={link}
            strokeWidth={2}
          />
        ))}
      </ForceGraph>
      <ReactTooltip type="info" effect="solid" />
    </div>
  )
}
