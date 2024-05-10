import {useState , useEffect} from "react";
import axios from "axios"
import './app.css'

const UserProfile=({user})=>{
  const {avatar , first_name , email ,last_name} = user

  return(
    <div className="userProfile">
      <img src={avatar} alt="1" />
      <h2>{first_name}</h2>
      <h4>{last_name}</h4>
      <p>{email}</p>
    </div>
  )
}

function App() {
  const[users , setUsers] = useState([])
  const[search , setSearch] = useState("")

  useEffect(()=>{
    fetchUsers()
  },[]);

  const fetchUsers=async ()=>{
    try {
      let res = await axios.get("https://reqres.in/api/users")
      console.log(res.data.data)
      setUsers(res.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  function handleSearch(e){
    setSearch(e.target.value)

  }

  const filterValue = users.filter((user)=>user.first_name.toLowerCase().includes(search.toLowerCase()));

  


  return (
    <>
    <div className="header">
    <h1>User Profiles</h1>
    <input type="text" value={search} placeholder="Search profile by name" onChange={handleSearch} />

    </div>
    <div className="container">
     {filterValue.map((user)=>(
      <UserProfile key={user.id} user={user}/>
     ))}
    </div>
    
    </>
  );
}

export default App;
