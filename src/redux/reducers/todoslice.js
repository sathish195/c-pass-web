
import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
        console.log(action.payload,"------>");
        console.log(state,"state");
      const todo = {
        id: action.payload.id,
        text: action.payload.text,
      };

      state.push(todo);
  }
,
  deleteTodo: (state, action) => {
return state.filter(todo => todo.id !== action.payload);
},
callData : (state,action) =>{
  console.log(action.payload,"userlist");
  return state.push(action.payload);
}

}

});

// this is for dispatch
export const { addTodo,deleteTodo,callData } = todoSlice.actions;


// this is for configureStore
export default todoSlice.reducer;