// The role of the component is to route users according to their role.
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, adminOnly }) {

  const { isLoggedIn, isAdmin } = useSelector(state => state.auth)

  // 1.Request For Logging First
  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  // Request For Admin Only 
  if (adminOnly === true && isAdmin === false) {
    return <Navigate to="/user" />
  }

  //Everything is Perfect 
  return children
}

export default ProtectedRoute
