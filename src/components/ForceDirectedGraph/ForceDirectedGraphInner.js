// @flow
// libs
import React, { useEffect, useState } from 'react'
import maxBy from 'lodash/fp/maxBy'
import minBy from 'lodash/fp/minBy'

// src
import { getColor } from './utils'
import styles from './styles.module.css'

export default function ForceDirectedGraphInner(props) {
  const { links, nodes, clusters, onMouseMove, onMouseLeave } = props
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (clusters.length > 0) {
      const maxY = maxBy('y')(clusters).y
      const minY = minBy('y')(clusters).y
      const maxX = maxBy('x')(clusters).x
      const minX = minBy('x')(clusters).x
      const scaleY = window.innerHeight / (Math.abs(maxY) + Math.abs(minY))
      const scaleX = window.innerWidth / (Math.abs(maxX) + Math.abs(minX))

      setScale(scaleY < scaleX ? scaleY : scaleX)
    }
  }, [clusters])

  return (
    <svg className={styles.root}>
      <g transform={`scale(${scale})`}>
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
      </g>
    </svg>
  )
}
