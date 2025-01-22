
import { createSlice } from '@reduxjs/toolkit';

export const contolsSlice = createSlice({
  name: 'controls',
  initialState: [],
  reducers: {
controlsData : (state,action) =>{
    console.log("called");
  console.log(action.payload,"controls--list");
 return [...state,action.payload];
}
}
});
// this is for dispatch
export const {controlsData } = contolsSlice.actions;
// this is for configureStore
export default contolsSlice.reducer;