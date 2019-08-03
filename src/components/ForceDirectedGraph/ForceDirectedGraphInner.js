// @flow
// libs
import React from 'react'
import ReactTooltip from 'react-tooltip'

// src
import { getColor } from './utils'

function onMouseMove(e) {
  ReactTooltip.show(e.target)
}

function onMouseLeave(e) {
  ReactTooltip.hide(e.target)
}

const ForceDirectedGraphInner = ({ width, height, links, nodes, clusters }) => {
  return (
    <React.Fragment>
      <svg width={width} height={height}>
        {clusters.map(({ x, y, r, title, cluster }, index) => (
          <circle
            key={cluster}
            data-tip={title || 'N/A'}
            r={r < 20 ? 20 : r}
            cx={x}
            cy={y}
            fill="#999"
            stroke="#ccc"
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
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </svg>
      <ReactTooltip type="light" effect="solid" />
    </React.Fragment>
  )
}

export default ForceDirectedGraphInner
