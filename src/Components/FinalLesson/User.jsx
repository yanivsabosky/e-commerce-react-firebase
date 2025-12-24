import { getTodos } from "./utilis";
import {useState,useEffect,memo} from 'react'




function User(props) {

        console.log("child rendering")

    const [todos,setTodos]= useState([])

    useEffect(()=>{
        async function load() {
            const data = await getTodos(props.user.id)
            setTodos(data)
            
        }
        load()
    },[])

  return (
    <>
    <table border="1" >
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>CITY</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{props.user.id}</td>
          <td>{props.user.name}</td>
          <td>{props.user.email}</td>
          <td>{props.user.address.city}</td>
        </tr>

      </tbody>
    </table>

    {todos.map((todo)=>(
        <ul key={todo.id}>
            <li>TItle:{todo.title}</li>
            <li>Completed:{todo.completed?"true":"false"}</li>
        </ul>
    ))}

   
    </>     
  );
}

export default memo(User);