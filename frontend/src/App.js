import React,{useState,useEffect} from "react";
import axios from "axios";
import './App.css';
import Weather from "./components/weather";
const API="http://localhost:5000/api/todos";
function App() {
  const[todos,setTodos]=useState([]);
  const[input,setInput]=useState("");
  const[editId,setEditId]=useState(null);

  useEffect(()=>{
    fetch("/api/todos")
    .then(res=>res.json())
    .then(data=>console.log(data));
    axios.get(API).then((res)=>setTodos(res.data));
  },[]);
  const handleSubmit=async()=>{
    if(!input.trim()) return;
    if(editId){
      const res=await axios.put(`${API}/${editId}`,{text:input});
      setTodos(todos.map((t)=>(t._id===editId?res.data:t)));
      setEditId(null);
    }else{
      const res =await axios.post(API,{text:input});
      setTodos([...todos,res.data]);
    }
    setInput("");
  };
  const handleDelete=async(id)=>{
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };
  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo._id);
  };
  const handleToggle = async (todo) => {
    const res = await axios.put(`${API}/${todo._id}`, { completed: !todo.completed });
    setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
  };
  return (
    <div className="App">
      <Weather/>
      <h1>Todo App</h1>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Add a todo..."
        />
        <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => handleToggle(todo)}>{todo.text}</span>
            <div>
              <button onClick={() => handleEdit(todo)}>✏️</button>
              <button onClick={() => handleDelete(todo._id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default App;
