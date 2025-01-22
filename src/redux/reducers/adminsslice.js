import { createSlice } from '@reduxjs/toolkit';
export const adminSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
callData : (state,action) =>{
    console.log("called");
  console.log(action.payload,"user--list");
 return [...state,...action.payload];
}
}
});
// this is for dispatch
export const {callData } = adminSlice.actions;


// this is for configureStore
export default adminSlice.reducer;