import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

let UserData=({user})=>{
  const {name,username,email}= user;

  return(
    <>
    <h2>{name} </h2>
    <p>{username} </p>
    <p>{email} </p>
    </>
  )

};

function App() {
  const [timer, setTimer] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const timerValue = setInterval(() => {
      setTimer(prevValue => prevValue + 1);
      console.log("Timer updated");
    }, 1000);

    return () => {
      clearInterval(timerValue);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollValue(window.scrollY); // Access window.scrollY for scroll position
      console.log("Scroll event");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run once when the component mounts

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData=async()=>{
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
      <h1>Timer Updates here</h1>
      <h2>Timer: {timer}</h2>
      <div className="scroll">
        <h1>Scroll position: {scrollValue}</h1>
      </div>
      <div>
      {users.map((user)=>(
        <UserData user={user} key={user.id} />
      )) }
      </div>
    </div>
  );
}

export default App;
