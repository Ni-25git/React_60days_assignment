import { useState, useEffect } from "react";
import axios from "axios"

let UserProfile=({user})=>{
  const {name, year , color } = user
  return(
    <div>
      <h2>{name}</h2>
      <p>{year}</p>
      <p>{color}</p>
    </div>
  )

}

function App() {
  const [users, setUsers] = useState([]);

  async function fetchAndUpdateData() {
    try {
      let res = await axios({
        method: "get",
        url: "https://reqres.in/api/users"
      })
      console.log(res.data.data)
      setUsers(res.data.data)

       // complete code
    } catch (error) {
       console.log(error)
    }
  }

  useEffect(function () {
    fetchAndUpdateData();
  }, []);

  return (
    <div className="App">
      <h1>List of users</h1>
      <div>
        {users.map((user)=>(
          <UserProfile user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}

export default App;