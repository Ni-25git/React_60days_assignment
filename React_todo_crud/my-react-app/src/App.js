import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState({ title: "", isCompleted: false, assignee: "" });
  const [data, setData] = useState([]);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [filter, setFilter] = useState([]);
  const [assigneeFilter, setAssigneeFilter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, assignee, isCompleted } = user;

    if (title && assignee) {
      try {
        const res = await axios.post("http://localhost:3001/todos", { title, assignee, isCompleted });
        console.log(res.data);
        setUser({ title: "", isCompleted: false, assignee: "" });
        setData([...data, res.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      const res = await axios.put(`http://localhost:3001/todos/${id}`, updatedTask);
      console.log(res.data);
      setData(data.map((task) => (task.id === id ? res.data : task)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setData(data.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const showIncompleteData = () => {
    setShowIncomplete(true);
    setFilter(data.filter((task) => !task.isCompleted));
  };

  useEffect(() => {
    if (assigneeFilter.trim() === "") {
      setFilter([]);
    } else {
      setFilter(data.filter((task) => task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())));
    }
  }, [data, assigneeFilter]);

  return (
    <div className="post">
      <div className="navbar">
        <button className="btn" onClick={showData}>Get all tasks</button>
        <button className="btn" onClick={showIncompleteData}>Show incomplete task</button>
        <input className="btn"
          type="text"
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          placeholder="Filter by Assignee:"
        />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title:
        </label><br/>
          <input type="text" value={user.title} onChange={(e) => setUser({ ...user, title: e.target.value })} /><br/>
        <label>
          Assignee:
        </label><br/>
          <input type="text" value={user.assignee} onChange={(e) => setUser({ ...user, assignee: e.target.value })} /><br/>
        <label>
          isCompleted:
        </label>
          <input type="checkbox" checked={user.isCompleted} onChange={(e) => setUser({ ...user, isCompleted: e.target.checked })} /><br/>
        <button type="submit">Submit</button>
      </form>

      <div className="parent">
        {showIncomplete
          ? filter.map((task) => (
              <div className="data" key={task.id}>
                <h3>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleUpdate(task.id, { ...task, title: e.target.value })}
                  />
                </h3>
                <p>
                  Assignee:{" "}
                  <input
                    type="text"
                    value={task.assignee}
                    onChange={(e) => handleUpdate(task.id, { ...task, assignee: e.target.value })}
                  />
                </p>
                <p>
                  isCompleted:{" "}
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) => handleUpdate(task.id, { ...task, isCompleted: e.target.checked })}
                  />
                </p>
                <div>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            ))
          : data.map((task) => (
              <div className="data" key={task.id}>
                <h3>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleUpdate(task.id, { ...task, title: e.target.value })}
                  />
                </h3>
                <p>
                  Assignee:{" "}
                  <input
                    type="text"
                    value={task.assignee}
                    onChange={(e) => handleUpdate(task.id, { ...task, assignee: e.target.value })}
                  />
                </p>
                <p>
                  isCompleted:{" "}
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) => handleUpdate(task.id, { ...task, isCompleted: e.target.checked })}
                  />
                </p>
                <div>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
