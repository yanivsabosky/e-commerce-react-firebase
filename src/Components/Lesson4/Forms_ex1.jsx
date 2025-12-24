import {useState} from 'react'
import axios from 'axios'

function Forms_ex1() {
    const [id,setId] = useState(0) 
    const [user,setUser] = useState({name:'',email:""})


    async function GettingData(id){
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        setUser({name:res.data.name,email:res.data.email})
    }



    async function updateUserInfo(user) {
        await axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`,user)   
        console.log(user)
    }



  return (
    <div>
        Forms

        UserId : <input type="number" onChange={e =>setId(e.target.value)} />
         <button onClick={(e)=>GettingData(id)}>Get Data</button>




        <form onSubmit={(e)=>{
            e.preventDefault()
            updateUserInfo(user) }}> 
            Name: <input  type="text" placeholder='Enter Your Name'  value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}  />
            Email: <input type='email' placeholder='Enter Your Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}  />
            <button type='submit'>Submit</button>

        </form>

    </div>
  )
}

export default Forms_ex1