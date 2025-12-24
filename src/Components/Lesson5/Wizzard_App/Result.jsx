import {useState,useEffect} from 'react'

function Result() {
    const[res,setRes] = useState({})

    useEffect(()=>{
        setRes(JSON.parse(sessionStorage.getItem("user")))
    },[])
  return (
    <div>
        <h1> The first Name is: {res.first_name}</h1>
        <h2>his Last name is: {res.last_name}</h2>
        <h3>city {res.city} </h3>
    </div>
  )
}

export default Result