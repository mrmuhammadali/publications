// libs
import { group, rollup } from 'd3-array'
import { interpolateHcl } from 'd3-interpolate'
import { packEnclose } from 'd3-hierarchy'
import replace from 'lodash/replace'
import { scaleLinear } from 'd3-scale'

export const createClusters = nodes => {
  return Array.from(
    group(nodes, d => d.data.cluster),
    ([, children]) => children,
  ).map(cluster => {
    return packEnclose(cluster)
  })
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

const color = scaleLinear()
  .domain([0, 3, 6, 9, 12, 15])
  .interpolate(interpolateHcl)
  .range(['red', 'green', 'blue', 'yellow', 'brown', 'orange'])

export function getColor({ cluster }) {
  const index = parseInt(replace(cluster, /cluster|Cluster/g, '')) || 0

  return color(index)
}
