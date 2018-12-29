// libs
import React from 'react'
import ReactTooltip from 'react-tooltip'

// src
import ForceDirectedGraph from './ForceDirectedGraph'
import data from './data/sample.json'

export default class ForceDirectedExample extends React.Component {
  state = {
    strength: Math.random() * 60 - 30,
  }

  render() {
    const { strength } = this.state

    return (
      <div className="force-directed-example">
        <button
          className="showcase-button"
          onClick={() => this.setState({ strength: Math.random() * 60 - 30 })}
        >
          {' Reweight '}
        </button>
        <ForceDirectedGraph
          data={data}
          height={500}
          width={500}
          animation
          strength={strength}
        />
        <ReactTooltip type="info" effect="solid" />
      </div>
    )
  }
}
