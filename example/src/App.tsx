import React from 'react'
import {hot} from 'react-hot-loader'

import {TextAnnotator, TokenAnnotator} from '../../src'

const TEXT = `On Monday night , Mr. Fallon will have a co-host for the first time : 
The rapper Cardi B , who just released her first album, " Invasion of Privacy . "`

const TAG_COLORS = {
  ORG: '#00ffa2',
  PERSON: '#84d2ff',
}

const Card = ({children}) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      maxWidth: 500,
      padding: 16,
    }}
  >
    {children}
  </div>
)

const CustomMark = props => (
  <span
    id={props.id}
    style={{
      padding: "0 0.25em",
      marginBottom: "5px",
      display: "inline-block", 
      verticalAlign: "top",
    }}
    data-start={props.start}
    data-end={props.end}
  >
      <u 
        style={{textDecorationColor: "red", textDecorationThickness: "0.15em"}}
        data-start={props.start}
        data-end={props.end}    
      >
        {props.content}
      </u>
      {props.tag && (
        <span style={{userSelect: "none"}}>
          <br />
          <span 
            style={{
              display: "inline-block", 
              padding: "0 0.2em",
              fontSize: '0.85em', 
              fontWeight: 500,
              backgroundColor: "red",
            }}
            >
              {props.tag} (role)
            </span>
        </span>
      )}
  </span>
)

class App extends React.Component<any, any> {
  state = {
    value: [],
    tag: 'person',
  }

  handleChange = value => {
    console.log(value)
    this.setState({value})
  }

  handleTagChange = e => {
    this.setState({tag: e.target.value})
  }

  render() {
    return (
      <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
        <h3 style={{marginTop: 0}}>react-text-annotate</h3>
        <a href="https://github.com/mcamac/react-text-annotate">Github</a>
        <p>A React component for interactively highlighting parts of text.</p>
        <div style={{display: 'flex', marginBottom: 24}}>
          <Card>
            <h4>Default</h4>
            <select onChange={this.handleTagChange} value={this.state.tag}>
              <option value="org">org</option>
              <option value="person">person</option>
            </select>
            <TextAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.2,
              }}
              content={TEXT}
              value={this.state.value}
              customMark={CustomMark}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
            />
          </Card>
        </div>
        <Card>
          <h4>Current Value</h4>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </Card>
      </div>
    )
  }
}

export default hot(module)(App)
