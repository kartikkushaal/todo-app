import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "./redux/slices/todosSlice";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { items: todos, loading, error } = useSelector((state) => state.todos);
  
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  
  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    if (editId) {
      await dispatch(updateTodo({ id: editId, data: { text: input } }));
      setEditId(null);
    } else {
      await dispatch(addTodo(input));
    }
    setInput("");
  };

  
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  
  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo._id);
  };

  
  const handleToggle = (todo) => {
    dispatch(toggleTodo(todo));
  };

  return (
    <div className="App">
      <Weather />
      
      <h1>Todo App</h1>
      
      {loading && <p>Loading todos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Add a todo..."
        />
        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => handleToggle(todo)}>{todo.text}</span>
            <div>
              <button onClick={() => handleEdit(todo)}>Todo</button>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;