import React from 'react'
import CounterCHanger from './CounterCHanger'
import CounterViewer from './CounterViewer'

function CounterHost() {
  return (
    <div style={{backgroundColor:"green"}}>
        <CounterCHanger/>
        <CounterViewer/>
    </div>
  )
}

export default CounterHost