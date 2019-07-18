// @flow
// libs
import React from 'react'
import ReactTooltip from 'react-tooltip'

// src
// import styles from './ForceDirectedGraphInner.css'
import { getColor } from './utils'

const ForceDirectedGraphInner = ({ width, height, links, nodes }) => (
  <div>
    <svg width={width} height={height}>
      {links.map((link, index) => (
        <line
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          key={`line-${index}`}
          stroke="gray"
        />
      ))}
      {nodes.map((node, index) => (
        <circle
          r={5}
          cx={node.x}
          cy={node.y}
          fill={getColor(node.data)}
          key={index}
          data-tip={node.data.title}
        />
      ))}
    </svg>
    <ReactTooltip type="info" effect="solid" />
  </div>
)

export default ForceDirectedGraphInner
