import React, { useState } from 'react'

export default function Header(props) {
  const [name,setName] = useState("")
  const [res,setRes] = useState('')

  const [count,setCount] = useState(0)
  const [counter,setCounter] = useState(0)

  const [isColor,setColor] =useState(true)
  return (
    <div>
      <h1 style={{color :  isColor ?'red' :'blue'}}>Hello</h1>
      <button onClick={()=>setColor(!isColor)}>Change Color</button>


      Im The Header!!
      <br />
      {/* getting data from parent component */}
      <h2 style={{color:"red"}}>
        {props.valuse}
        </h2>
      <br />
      {/* creating event */}
      <button onClick={()=>alert("ahh i got clicked")}>try</button>
      <br />
      <input type="text" placeholder='Enter Your name'  onChange={(event)=>setName(event.target.value)} />
      <button onClick={()=>setRes(name)}>Click</button>
      {res.length >3 ? <h3>{res}</h3> : null}

      <br />
       <h2>Total {counter > 0 ? counter : 'Tap To Start'}</h2>
      <input type='number' placeholder='Adding Numbers' 
       onChange={(e) => setCount(+e.target.value )}
    />
      <button onClick={()=>setCounter((prev)=>prev +count)}>Click</button>
      

    </div>
  )
}
