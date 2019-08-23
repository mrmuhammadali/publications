// libs
import flow from 'lodash/fp/flow'
import reduce from 'lodash/fp/reduce'
import uniqBy from 'lodash/fp/uniqBy'
import uniq from 'lodash/fp/uniq'
import times from 'lodash/times'
import { hierarchy, pack } from 'd3-hierarchy'
import { group } from 'd3-array'
import { scaleOrdinal } from 'd3-scale'

const transformData = data => {
  const colors = uniq(generateColor())
  const color = scaleOrdinal(colors)
  const nodes = data.nodes.map(({ Id: id, Title: title, cluster }) => ({
    id,
    title,
    cluster: `Cluster${cluster}`,
    color: color(cluster),
  }))
  const links = data.links.map(({ Source: source, target }) => ({
    source,
    target,
  }))

  return { nodes, links }
}

export const filterData = _data => {
  const data = transformData(_data)
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
function generateColor() {
  const scheme1 = '4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab'
  const scheme2 = '1b9e77d95f027570b3e7298a66a61ee6ab02a6761d'
  const scheme3 =
    '8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f'
  const colorSpecifier = scheme1 + scheme2 + scheme3
  const n = (colorSpecifier.length / 6) | 0
  return times(n, i => '#' + colorSpecifier.slice(i * 6, ++i * 6))
}
