import {useState} from 'react'
import axios from 'axios'

function Axi() {
  const [id,setId] = useState(0)
  const [user,setUser] =useState({name:'',email:''})
  const [todos,setTodos] = useState([])
  const [flag,isFlag] = useState(false)


    const GettingData = async(id)=>{
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        if(res.data.name.charAt(0) ==='E'){
          let data = await axios.get(`https://jsonplaceholder.typicode.com/todos/?userId=${id}`)
          setTodos(data.data)
          isFlag(true)
        }
        else setTodos([])
        const {name,email} = res.data
        setUser({name,email})
        isFlag(false)
    }
  return (
    <div>
      Enter the id of the person you want to see : <input type="number" min={1} max={9} placeholder='ready when you are!' onChange={(e)=>setId(Number(e.target.value))} />
        <button onClick={()=>GettingData(id)}>Get Users</button>


        <h1>Users Info</h1>
        Name:<h2>{user.name}</h2>
        Email:<h2>{user.email}</h2>
   
        TODOS:
        
        {todos.map((todo)=>
        <ul key={todo.id}>
          <li>Title:{todo.title}</li>
          <li>Completed:{todo.completed}</li>
        </ul>)}
        
    

    </div>
  )
}

export default Axi