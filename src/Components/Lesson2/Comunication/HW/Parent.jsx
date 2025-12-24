import {useState} from 'react'
import Child from './Child'

function Parent() {
    const [objects,setObjects] = useState([])
    
    function Add(data) {
        setObjects((prev)=>[...prev,data])
    }
  return (
    <div style={{backgroundColor:'yellow'}}>
        <h1>Parent Component</h1>
        <ul>
            {objects.map((e,index)=><li key={index}> 
                {e.name} is {e.age} years old ,
                 lives in {e.city} and is a {e.isAdult ? "Adult":'Not Adult'} </li>)}
        </ul>
        <Child AddObject={Add}/>

    </div>
  )
}

export default Parent