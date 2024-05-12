import {useState, useEffect} from "react";
import axios from "axios";

let UserData=({user})=>{
  const {name,username,email} = user;

  return(
    <div>
      <h2>{name} </h2>
      <h3>{username} </h3>
      <p>{email}</p>
    </div>
  )
}

function App() {
  const [users,setUsers] = useState([])

  useEffect(()=>{
  
    fetchData()
    const handleMouseMove = (event) => {
      console.log(`Mouse position: ${event.clientX}, ${event.clientY}`);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Update the document title
    document.title = "Component did Mount";

    // Cleanup functions
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.title = "Component didUpdate";
    };
  },[])

  let fetchData= async()=>{
    try {
      let res = await axios({
        method:"get",
        url:"https://jsonplaceholder.typicode.com/users"
      })
      console.log(res.data)
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>list of users</h1>
      <div>
        {users.map((user)=>(
          <UserData key={user.id} user={user} />
        ))}
      </div>
      <div>Move your mouse to see the position</div>
      <div>This component updates the document title</div>
    </div>
  );
}

export default App;
