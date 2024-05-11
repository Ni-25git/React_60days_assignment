import {useState} from "react"
import "./App.css"

function App() {
  const [todos , setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("")

function handleAddTodo(){
  if(newTodo.trim() !== ""){
    setTodos([...todos,{id: Date.now(), text:newTodo , completed:false}]);
    setNewTodo("")
  }
}

 function handleNewtodo(e){
  setNewTodo(e.target.value)
 }

const handleToggleComplete=(id)=>{
  setTodos(
    todos.map((todo)=> todo.id===id ? {...todo , completed:!todo.completed} : todo)
  )
}

const handleDeleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
   
      
  return (
    <>
    <div className="form">
    <h1>Todo List</h1>
    <form onSubmit={(e)=>{
      e.preventDefault();
      handleAddTodo()
    }}>
      <input type="text" value={newTodo} placeholder="Enter todo here" onChange={handleNewtodo} />
      <button type="submit">Add Todo</button>
    </form>
    </div>
    <div className="output">
    <ul>
      {todos.map((todo)=>(
        <li key={todo.id}  className="li">
          <input type="checkbox" checked={todo.completed}  onChange={() => handleToggleComplete(todo.id)}/>
          <span>{todo.text}</span>
          <button onClick={()=> handleDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
    
    </>
  );
}

export default App;
