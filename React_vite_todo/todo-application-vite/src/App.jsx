import { useState } from 'react'
import "./App.css"

const UserData=({tasks})=>{

  return(
    <div className='tasks'>
         <p>{tasks.title} </p>
          <p>{tasks.assignee} </p>
          <p>{tasks.isCompleted ? "completed" : "not completed"} </p>
    </div>
  )
}

function App() {
  const [todo, setTodo] = useState({title:"",assignee:"",isCompleted:false})
  const [tasks , setTasks] = useState([])

  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log("working")
    setTasks([...tasks,todo]);
    setTodo({title:"",assignee:"",isCompleted:false})
  }

  return (
    <div>
    <h1>Todo Application</h1>
    <form onSubmit={handleSubmit} className='form'>
      <label>Title:</label><br/>
    <input type='text' value={todo.title} onChange={(e)=>setTodo({...todo,title:e.target.value})}  /><br/>
    <label>Assignee:</label><br/>
    <input type='text' value={todo.assignee} onChange={(e)=>setTodo({...todo,assignee:e.target.value})}  /><br/>
    <label>isCompleted:</label>
    <input type='checkbox' checked={todo.isCompleted} onChange={(e)=>setTodo({...todo,isCompleted:e.target.checked})}  /><br/>
    <button type='submit'>Add Todo</button>
    </form>
    <div>
      {tasks.map((task,index)=>(
        <UserData key={index} tasks={task} />
      ))}
    </div>
    </div>
  )
}

export default App
