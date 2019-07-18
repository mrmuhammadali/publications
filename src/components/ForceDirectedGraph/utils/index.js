import { rollup } from 'd3-array'
import replace from 'lodash/replace'

export const forceCluster = () => {
  const strength = 0.1
  let nodes
  function force(alpha) {
    const centroids = rollup(nodes, centroid, d => d.data.cluster)
    const l = alpha * strength
    for (const d of nodes) {
      const { x: cx, y: cy } = centroids.get(d.data.cluster)
      d.vx -= (d.x - cx) * l
      d.vy -= (d.y - cy) * l
    }
  }

  force.initialize = _ => (nodes = _)

  return force
}

const centroid = nodes => {
  let x = 0
  let y = 0
  let z = 0
  for (const d of nodes) {
    let k = 5 ** 2
    x += d.x * k
    y += d.y * k
    z += k
  }
  return { x: x / z, y: y / z }
}

const COLORS = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#4DC19C',
  '#12939A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#E79FD5',
  '#89DAC1',
]

export function getColor({ cluster }) {
  const index = replace(cluster, /cluster|Cluster/g, '')

  return index ? COLORS[parseInt(index)] : COLORS[0]
}
