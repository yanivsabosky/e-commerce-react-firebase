import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link,useParams} from 'react-router-dom'

function Todos() {
     const ob = useParams()
     const [tosdo,setTodos]= useState([])

     useEffect(()=>{
        async function getTodos() {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${ob.userId}`);
            setTodos(res.data)

            
        }
        getTodos()
     },[ob])

  return (
    <div>
        <h1>Todos</h1>
        {tosdo.map((todo)=>(
            <ul key={todo.id}>
                <li>{todo.title}</li>
                <li>{todo.completed}</li>
            </ul>
        ))}

        <Link to={`/${ob.userId}`}>
         <button>
            Back
        </button>
        </Link>


    </div>
  )
}

export default Todos