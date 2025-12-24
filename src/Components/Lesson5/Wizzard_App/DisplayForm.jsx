import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


function DisplayForm() {
    const navgite = useNavigate()
    const [user,setUser]= useState({first_name:"",last_name:"",city:""})
    function CheckProcced(){

        if(user.first_name.trim().length<2 || user.last_name.trim().length<2){
            alert("sorry you cannot proccedd u have to write first and last name")
            return;
        }
        sessionStorage.setItem("user",JSON.stringify(user))
        navgite("/City")

    }
  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            CheckProcced()
        }}>
            First Name: <input placeholder='Enter Your FirstName' value={user.first_name} onChange={(e)=>setUser({...user,first_name:e.target.value})}/>
            Last Name: <input placeholder='Enter your LastName' value={user.last_name}  onChange={(e)=>setUser({...user,last_name:e.target.value})}/>
            <button type='submit'>Next</button>
        </form>
    </div>
  )
}

export default DisplayForm