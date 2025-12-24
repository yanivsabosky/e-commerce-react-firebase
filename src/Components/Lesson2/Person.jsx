import Task from "./Task"


function Person(props) {
  return (
    <div>
        Name: {props.per.name}
        <br />
     Task: <Task tasks= {props.per.tasks} />
     <br />
    </div>
  )
}

export default Person