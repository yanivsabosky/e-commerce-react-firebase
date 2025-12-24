import Prod from "./Prod"
import { useSelector } from 'react-redux';


function ProductsList() {
    
    const storeData = useSelector(state => state)
 

  return (
    <div>
        <h2>Current Product List</h2>
        {storeData.map((product,index)=>(
            <ul key={index}>
                <li>
                     <Prod product={product}/>
                </li>
            </ul>
            
            ))}
           
      

    </div>
  )
}

export default ProductsList