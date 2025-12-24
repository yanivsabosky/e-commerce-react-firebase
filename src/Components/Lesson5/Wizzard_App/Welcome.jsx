import { useNavigate } from "react-router-dom"

function Welcome() {
    const navgite = useNavigate();

    const  next =()=>{navgite("/FormDisplay")}
  return (
    <div>
        <button onClick={next}>Move</button>
    </div>
  )
}

export default Welcome