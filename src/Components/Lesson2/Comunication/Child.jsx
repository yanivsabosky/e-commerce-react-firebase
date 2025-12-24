import {useState} from 'react'

function Child(props) {
    const [data,setData] = useState("")
    
  return (
    <div>
        <input type="text" onChange={(e)=>setData(e.target.value)} />
        <button onClick={
          ()=> props.data(data)

        }>Click</button>
    </div>
  )
}

export default Child