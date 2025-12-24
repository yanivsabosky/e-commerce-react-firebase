import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"


function DisplayCity() {
    const navgite = useNavigate()
    const [user,setUser] = useState({});

    useEffect(()=>{
        setUser(JSON.parse(sessionStorage.getItem("user")) || {})
    },[])


    function HandleChnages(e){
        setUser({...user,city:e.target.value})
    }

    function SubmitData(){
        if(user.city.length<2){
            alert("sorry  you need to select a city")
            return;
        }
        sessionStorage.setItem("user",JSON.stringify(user));
        navgite('/Res')
    }
  return (
    <div>
        <select value={user.city} onChange={HandleChnages}>
            <option value="Ashdod">Ashdod</option>
            <option value="Tel Aviv">Tel Aviv</option>
            <option value="Haifa">Haifa</option>

        </select>

        <button onClick={SubmitData}>submit</button>
    </div>
  )
}

export default DisplayCity