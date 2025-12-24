import { useSelector } from 'react-redux';
import  { useEffect, useState } from 'react'

function TotalSum() {
       const storeData = useSelector(state => state)
    

    
        const result = storeData.reduce((sum, item) => sum + Number(item.price), 0);
   
  return (
    <div>Total Price: {result}</div>
  )
}

export default TotalSum