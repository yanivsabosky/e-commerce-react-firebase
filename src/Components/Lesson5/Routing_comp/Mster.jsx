import axios from 'axios'
import  { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function Mster() {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        async function getUsers() {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            setUsers(res.data)
        }
        getUsers()

    }
    ,[])
  return (
    <div>
        {/* sub routing page */}
        <Link to={'/Contact'}>Contact Page</Link>

        
        {/* details page */}
        {users.map((user)=>(
            <ul  key={user.id}> 
                <li>
                    <Link to={`/${user.id}`}> {user.name}</Link>
                   
                    </li>
            </ul>
        ))}
        
    </div>
  )
}

export default Mster