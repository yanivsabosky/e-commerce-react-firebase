import React, { useState } from 'react'

function Pepoles() {

    const [pep,setP] = useState([{
        name:"yaniv",
        age:27,
        city:'karmiel'
    },
    {
        name:"amit",
        age:27,
        city:'mhanyim'
    }
    ])
    const [flag,isFlag] = useState(true)
    const [person,setPerson] = useState({
         'name':"",
        'age':0,
        'city':''
    })

    function AddingPer(e){
         setPerson({...person,[e.target.name]:e.target.type === 'number' ? +e.target.value :e.target.value})
          
    }
  return (
    <div>
        {flag && <table border={1}>
            <tr>
                <th>name</th>
                <th>age</th>
                <th>city</th>
            </tr>
            {
            pep.map((p,index)=> <tr key={index}>
                <td>{p.name}</td>
                 <td>{p.age}</td>
                  <td>{p.city}</td>
               </tr>) 
            }
                </table>}

            {/* option 1 */}
            {/* <button onClick={()=>isFlag(!flag)}>Add People</button>
            { !flag && <div>
                <input type="text" placeholder='Enter Your Name' onChange={(event)=>setPerson({...person,name:event.target.value})} />
                <input type="number" placeholder='Enter Your Age'  onChange={(event)=>setPerson({...person,age:event.target.value})}/>
                <input type="text" placeholder='Enter your City' onChange={(event)=>setPerson({...person,city:event.target.value})} />
                <button onClick={()=>{
                    setP([...pep,person])
                    isFlag(!flag)
                }}>Submit</button>

            </div>} */}

            {/* /option 2 */}

            <button onClick={()=>isFlag(!flag)}>Add People</button>
            { !flag && <div>
                <input name='name'  type="text" placeholder='Enter Your Name' onChange={AddingPer} />
                <input name='age' type="number" placeholder='Enter Your Age'   onChange={AddingPer}/>
                <input name='city' type="text" placeholder='Enter your City'  onChange={AddingPer} />
                <button onClick={()=>{
                    setP([...pep,person])
                    isFlag(!flag)
                }}>Submit</button>

            </div>}

            
            

    </div>
  )
}

export default Pepoles