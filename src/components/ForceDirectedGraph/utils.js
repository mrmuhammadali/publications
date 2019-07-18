// libs
import { group, rollup } from 'd3-array'
import { packEnclose } from 'd3-hierarchy'
import replace from 'lodash/replace'

export const createClusters = nodes => {
  return Array.from(
    group(nodes, d => d.data.cluster),
    ([, children]) => children,
  ).map(cluster => packEnclose(cluster))
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

const COLORS = [
  '#C0C0C0',
  '#FF0000',
  '#800000',
  '#FFFF00',
  '#808000',
  '#00FF00',
  '#008000',
  '#00FFFF',
  '#008080',
  '#0000FF',
  '#FF00FF',
  '#800080',
  '#E79FD5',
  '#89DAC1',
]

export function getColor({ cluster }) {
  const index = replace(cluster, /cluster|Cluster/g, '')

  return index ? COLORS[parseInt(index)] : COLORS[0]
}
