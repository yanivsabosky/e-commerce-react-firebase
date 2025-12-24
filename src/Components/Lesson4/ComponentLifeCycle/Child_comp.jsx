import axios from 'axios'
import {useState,useEffect} from 'react'

export default function Child_comp(props) {
  const [todos,settodos]= useState([])

  useEffect(()=>{
   async function GetTodos() {
     let res = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${props.id}&_limit=5`)
     res = res.data.map((todo)=>todo.title)
     settodos(res)
    }
    GetTodos()

  },[props.id])
  return (
    <div>
      <h1>The Todos of The user id</h1>
      {todos.map((todo,index)=>
      <ul key={index}>
        <li>{todo}</li>

      </ul>)}
    </div>
  )
}
