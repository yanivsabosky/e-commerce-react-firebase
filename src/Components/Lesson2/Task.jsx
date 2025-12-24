

function Task(props) {
  return (
    <div>
        {props.tasks.map((t,index) => {
            return (
                <div  key={index}>
                     <li>
                    Title: {t.Title}
                    </li>
                     <li >
                    Completed: {t.Completed.toString()}
                </li>
          
                </div>
                
               
            )
        })}
        
    </div>
  )
}

export default Task