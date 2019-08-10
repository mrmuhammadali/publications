// libs
import React from 'react'
import ReactTooltip from 'react-tooltip'

// src
// import linksData from './data/links.json'
// import nodesData from './data/nodes.json'
import {
  node as nodesData,
  link as linksData,
} from './data/citation_network.json'
import { createNodesHierarchy, filterData, groupNodes } from './utils'
import ForceDirectedGraph from './components/ForceDirectedGraph/ForceDirectedGraph'
import styles from './App.module.css'

function onMouseMove(e) {
  ReactTooltip.show(e.target)
}

function onMouseLeave(e) {
  ReactTooltip.hide(e.target)
}

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
    <div className={styles.root}>
      <h2 className={styles.title}>Force Directed Graph</h2>
      <ForceDirectedGraph
        nodes={nodes}
        links={links}
        height={window.innerHeight}
        width={window.innerWidth}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />
      <ReactTooltip type="light" effect="solid" />
    </div>
  )
}
