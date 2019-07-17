import { rollup, group, pack } from 'd3-array'
import { hierarchy } from 'd3-hierarchy'

export const nodesHierarchy = (nodes, width, height, crieteria) => {
  pack()
    .size([width, height])
    .padding(1)(hierarchy(nodes).sum(d => d[crieteria]))
}

export const nodeTransformer = nodes => ({
  children: Array.from(group(nodes, d => d.group), ([, children]) => ({
    children,
  })),
})

export const forceCluster = () => {
  const strength = 0.1
  let nodes

  function force(alpha) {
    const centroids = rollup(nodes, centroid, d => d.data.group)
    const l = alpha * strength
    for (const d of nodes) {
      const { x: cx, y: cy } = centroids.get(d.data.group)
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
