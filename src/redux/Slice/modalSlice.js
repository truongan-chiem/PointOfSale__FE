import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggleForm : false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModalForm : (state) =>{
        state.isToggleForm = !state.isToggleForm
    },
   
  },
});

export default modalSlice.reducer;

export const {toggleModalForm } = modalSlice.actions;
