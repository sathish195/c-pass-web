import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoslice';
import  adminSlice  from '../reducers/adminsslice';
import controls from '../reducers/admincontrols'

export default configureStore({
  reducer: {
    todos: todoReducer,
    adminData : adminSlice,
    controls : controls
  },
});
