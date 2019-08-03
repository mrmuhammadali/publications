// libs
import flow from 'lodash/fp/flow'
import reduce from 'lodash/fp/reduce'
import uniqBy from 'lodash/fp/uniqBy'
import { hierarchy, pack } from 'd3-hierarchy'
import { group } from 'd3-array'

export const filterData = data => {
  const nodes = data.nodes.reduce((final, node) => {
    return {
      ...final,
      [node.id]: node,
    }
  }, {})
  const filteredLinks = data.links.filter(({ source, target }) => {
    return Boolean(nodes[source]) && Boolean(nodes[target]) && source !== target
  })
  const filteredNodes = flow(
    reduce(
      (final, { source, target }) => [...final, nodes[source], nodes[target]],
      [],
    ),
    uniqBy('id'),
  )(filteredLinks)

  return { links: filteredLinks, nodes: filteredNodes }
}

export const createNodesHierarchy = (width, height, crieteria, nodes) => {
  return pack()
    .size([width, height])
    .radius(() => 14)
    .padding(1)(hierarchy(nodes).sum(d => d[crieteria]))
    .leaves()
}

export const groupNodes = nodes => ({
  children: Array.from(group(nodes, d => d.cluster), ([, children]) => ({
    children,
  })),
})
