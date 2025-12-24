import { useSelector } from 'react-redux';

function AdultUsers() {
  const data = useSelector(store => store)  
  return (
    <div>
      <h1>AdultUsers</h1>  
      {data.filter(user => user.age >= 18).map((u)=> {
        return(
          <tr key={u.id}>
          <td>{u.id}</td>
          <td>{u.fname}</td>
          <td>{u.lname}</td>
          <td>{u.age}</td>
          
        </tr>   
        ) 
      })}
       
        
        
        </div>
  )
}

export default AdultUsers