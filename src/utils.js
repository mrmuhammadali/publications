// libs
import flow from 'lodash/fp/flow'
import { group } from 'd3-array'
import reduce from 'lodash/fp/reduce'
import replace from 'lodash/replace'
import uniqBy from 'lodash/fp/uniqBy'

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
  const groupedNodes = group(filteredNodes, d => d.cluster)

  return { links: filteredLinks, nodes: filteredNodes, groupedNodes }
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
