import {useDispatch} from 'react-redux'
import { useState } from 'react'

function CounterCHanger() {
    const [input,setInput] = useState(0);
    const disptach = useDispatch()

    const add = ()=>{disptach({type:'Increment',payload:input})}
    const minos = ()=>{disptach({type:'Decrement',payload:input})}
  return (
    <div style={{backgroundColor:"red"}}>
        <input type="text" placeholder='Enter the amout u wish?'  onChange={(e)=>setInput(+e.target.value)}/>

        <button onClick={add}>+</button>
        <button onClick={minos}>-</button>

    </div>
  )
}

export default CounterCHanger