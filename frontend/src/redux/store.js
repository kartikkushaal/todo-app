import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todosSlice';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    weather: weatherReducer,
  },
});

export default store;
