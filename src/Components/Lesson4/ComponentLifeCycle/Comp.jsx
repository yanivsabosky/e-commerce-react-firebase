// מחזור החיים של הרכיב

import {useState} from 'react'
import Child_comp from './Child_comp'

function Comp() {
    const [id,setId]= useState(0)
  return (
    <div>
      <input type='number' min={1} max={9} placeholder='Enter A number' onChange={(e)=>setId(e.target.value)} />

      <Child_comp id={id}/>
    </div>
  )
}

export default Comp




// firt way  rerander each time any useState parmater change
    //   useEffect(()=>{
        // console.log('Use Effect 1')
    // })

// second way will re rander once the website randering
//   useEffect(()=>{
        // console.log('Use Effect 1')
    // },[])


// third way will re randing acording to the list of dependcies he got
//   useEffect(()=>{
        // console.log('Use Effect 1')
    // },[ex1,ex2,ex3])