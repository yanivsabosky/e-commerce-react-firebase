import {useDispatch} from 'react-redux'

function Prod(props) {
    const disptach = useDispatch()    
    const remove= ()=>{disptach({type:'Remove',payload:props.product.name})}

  return (
    <div>
        <h3>Product Data</h3>
        Name:{props.product.name}
        <br />
        Price:{props.product.price}
        <br />
        <button onClick={remove}>Remove</button>
    </div>
  )
}

export default Prod