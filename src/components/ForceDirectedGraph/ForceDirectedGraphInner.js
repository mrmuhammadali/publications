// @flow
// libs
import React from 'react'

// src
import { getColor } from './utils'
import styles from './styles.module.css'

export default function ForceDirectedGraphInner(props) {
  const { links, nodes, clusters, onMouseMove, onMouseLeave } = props

  return (
    <svg className={styles.root}>
      {clusters.map(({ x, y, r, title, cluster }, index) => (
        <circle
          key={cluster}
          className={styles.cluster}
          data-tip={title || 'N/A'}
          r={r < 20 ? 20 : r}
          cx={x}
          cy={y}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      ))}
      {links.map(({ source, target }, index) => (
        <line
          x1={source.x}
          y1={source.y}
          x2={target.x}
          y2={target.y}
          key={`line-${index}`}
          stroke="#888"
        />
      ))}
      {nodes.map((node, index) => (
        <circle
          key={index}
          data-tip={node.data.title}
          r={node.r - 7}
          cx={node.x}
          cy={node.y}
          fill={getColor(node.data)}
          stroke="#999"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </svg>
  )
}
