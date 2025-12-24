import axios from 'axios';
import { useEffect, useState } from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'

function Details() {
    const obj = useParams()
    const [user,setUser] = useState({});

    useEffect(()=>{
        async function getUser(){
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${obj.id}`);
            setUser(res.data)
            
        }
        getUser()
      
   
    },[obj])
  return (
    <div>
        <h1>User Details!</h1>
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>
        <h2>{user.address?.city}</h2>

        <Link to={`posts/${user.id}`}>
         <button>
            posts
        </button>
        </Link>

        <Link to={`todos/${user.id}`}>
         <button>
            todos
        </button>
        </Link>
        
        <Link to={"/"}>
         <button>
            Home
        </button>
        </Link>

        <Outlet/>

    </div>
  )
}

export default Details