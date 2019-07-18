// libs
import React from 'react'

// src
import linksData from './data/links.json'
import nodesData from './data/nodes.json'
import { createNodesHierarchy, filterData, groupNodes } from './utils'
import ForceDirectedGraph from './components/ForceDirectedGraph/ForceDirectedGraph'

export default function ForceDirectedExample() {
  const { nodes: rawNodes, links } = filterData({
    nodes: nodesData,
    links: linksData,
  })
  const groupedNodes = groupNodes(rawNodes)
  const nodes = createNodesHierarchy(
    window.innerHeight,
    window.innerWidth,
    'numberOfCitations',
    groupedNodes,
  )

  return (
    <ForceDirectedGraph
      nodes={nodes}
      links={links}
      height={window.innerHeight}
      width={window.innerWidth}
    />
  )
}
