import {useDispatch} from 'react-redux'
import { useState } from 'react'

function NewProduct() {
    const [product,setProduct] = useState({name:"",price:0})
    const disptach = useDispatch()

    const Submit= ()=>{disptach({type:'Add',payload:product})}
  return (
    <div>
        <h1>Order New Product</h1>
        <form onSubmit={(e)=>{
            e.preventDefault()
            Submit()
        }}>
            Name:<input type='text' onChange={(e)=>setProduct({...product,name:e.target.value})}/>
            Price: <input type='number'onChange={(e)=>setProduct({...product,price:+e.target.value})}/>
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default NewProduct