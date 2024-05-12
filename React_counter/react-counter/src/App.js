import {useState} from "react";
import "./App.css"

function App() {
  const [count, setCount] = useState(0);

  function incrementBtn(){
    setCount(count + 1)
  };

  function decrementBtn(){
    if(count > 0){
      setCount(count - 1)
    }
  }
  return (
    <div className="App">
      <h1>Counter App</h1>
    <h1>Count {count}</h1>
    <button onClick={incrementBtn}>Increment by 1</button>
    <button onClick={decrementBtn}>Decrement by 1</button>
    </div>
  );
}

export default App;
