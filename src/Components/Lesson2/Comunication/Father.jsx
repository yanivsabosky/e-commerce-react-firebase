import {useState} from 'react'
import Child from './Child'


function Father() {
    const [info,setInfo] = useState('')
    function ChangeData(data){
        setInfo(data)
    }
  return (
    <div>
        <h1>Im The Father</h1>
        <Child data={ChangeData}/>

        <h2>this is the child  info: {info}</h2>


    </div>
  )
}

export default Father