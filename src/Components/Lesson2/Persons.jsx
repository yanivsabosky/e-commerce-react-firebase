import { useState } from "react"
import Person from "./Person"

function Persons() {
    const [persons,setPersons] = useState([
        {"name":'Avi',
            "tasks":[
                {'Title' : 'Task A'
                 ,'Completed' : true},

                  {'Title' : 'Task B'
                 ,'Completed' : false},

            ]
        },
            {"name":'Dane',
            "tasks":[
                {'Title':'Task C',
                 'Completed':true   
                },
                {'Title':'Task D',
                 'Completed':true   
                }
            ]
        }   
    ])
  return (
    <div>
        <h1>List Of All The Persons</h1>
        {persons.map((p)=><Person per = {p} />)}
        
    </div>
  )
}

export default Persons