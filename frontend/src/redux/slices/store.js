import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import weatherReducer from './weatherSlice';

export const store = configureStore({
    reducer:{
        todos:todosReducer,
        weather:weatherReducer
    },
});
export default store;
