import React from 'react'
import SubRoute from './Routing_comp/ContactByemail'
import SubRoute2 from './Routing_comp/ContactByemail'
import {Link, Outlet} from 'react-router-dom'

function Contact() {
  return (
    <div style={{height:"400px",width:"400px"}}>
      {/* חובה בשביל סב רוטינג */}
        

        Contact

        <Link to="email">By email </Link>

        <Outlet/>
      
    </div>
  )
}

export default Contact