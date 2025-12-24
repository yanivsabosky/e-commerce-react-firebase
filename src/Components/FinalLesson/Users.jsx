import {useState,useEffect} from 'react'
import { getAllUsers } from './utilis'
import User from './User'
function Users() {

    const[users,setUsers] = useState([])
  
    useEffect(()=>{
       async function load() {
            const data = await getAllUsers();
            setUsers(data); 
        }
       load();
    },[])

    console.log("parent rendering")


  return (
    <>

        Users
        {users.map((u)=>{
            return <User key={u.id} user={u}/>
        })}
      

    </>
  )
}

export default Users