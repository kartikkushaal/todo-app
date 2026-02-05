import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'; 
const API=`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/todos`;

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get(API);
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (text) => {
    const response = await axios.post(API, { text });
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, data }) => {
    const response = await axios.put(`${API}/${id}`, data);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (todo) => {
    const response = await axios.put(`${API}/${todo._id}`, { 
      completed: !todo.completed 
    });
    return response.data;
  }
);


const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      })
      
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default todosSlice.reducer;