import {useState} from 'react'

function Child(props) {
    const [obj,setObj] = useState({
        name:'',
        age:0,
        city:'',
        isAdult:false
    })

    
   const handleData = (e) => {
    const { name, type, value, checked } = e.target
    let res

    switch (type) {
      case 'number':
        res = +value
        break
      case 'checkbox':
        res = checked
        break
      default:
        res = value
        break
    }

    setObj(prev => ({ ...prev, [name]: res }))
  }
    
  return (
    <div style={{backgroundColor:'gray',}}>
        <h2>Child Component</h2>
        Name: <input name='name' type="text" onChange={(e)=>handleData(e)} />
        Age: <input type='number' name='age' onChange={(e)=>handleData(e)} />
        City: <input type="text" name='city' onChange={e=>handleData(e)} />
        Is Adult: <input type='checkbox'  name='isAdult' onChange={e=>handleData(e)} />
        <button onClick={()=>props.AddObject(obj)}>Add</button>


    </div>
  )
}

export default Child