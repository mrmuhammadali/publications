// libs
import React from 'react'

// src
import linksData from './data/links.json'
import nodesData from './data/nodes.json'
import { filterData, nodesHierarchy, nodeTransformer } from './utils'
import ForceDirectedGraph from './components/ForceDirectedGraph/ForceDirectedGraph'

const data = filterData({ nodes: nodesData, links: linksData })

export default function ForceDirectedExample() {
  const { nodes: rawNodes, links } = data
  const groupedNodes = nodeTransformer(rawNodes)
  const nodes = nodesHierarchy(
    groupedNodes,
    window.innerHeight,
    window.innerWidth,
    'numberOfCitations',
  ).leaves()

  return (
    <ForceDirectedGraph
      nodes={nodes}
      links={links}
      height={window.innerHeight}
      width={window.innerWidth}
    />
  )
}
