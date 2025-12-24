import { useSelector } from 'react-redux';


function AllUsers() {
    const storeData = useSelector(state => state)

  return (
    <div>
        <h1>All Users:</h1>
       
            {storeData.map((u)=>(
                 <ul key={u.id}>
                    <li>{u.id}</li>
                    <li>{u.fname}</li>
                    <li>{u.lname}</li>
                    <li>{u.age}</li>

                </ul>

            ))}
        

    </div>
  )
}

export default AllUsers