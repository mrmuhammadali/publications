// @flow
// libs
import React from 'react'
import ReactTooltip from 'react-tooltip'

// src
import { getColor } from './utils'

const ForceDirectedGraphInner = ({ width, height, links, nodes, clusters }) => (
  <div>
    <svg width={width} height={height}>
      {links.map(({ source, target }, index) => (
        <line
          x1={source.x}
          y1={source.y}
          x2={target.x}
          y2={target.y}
          key={`line-${index}`}
          stroke="#C0C0C0"
        />
      ))}
      {nodes.map((node, index) => (
        <circle
          key={index}
          data-tip={node.data.title}
          r={node.r - 6}
          cx={node.x}
          cy={node.y}
          fill={getColor(node.data)}
          stroke="#999"
        />
      ))}
      {clusters.map(({ x, y, r }, index) => (
        <circle key={index} r={r} cx={x} cy={y} fill="none" stroke="#999" />
      ))}
    </svg>
    <ReactTooltip type="info" effect="solid" />
  </div>
)

export default ForceDirectedGraphInner
