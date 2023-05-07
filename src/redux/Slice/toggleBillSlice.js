import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggle : false,
};

const toggleBillSlice = createSlice({
  name: "toggleBill",
  initialState,
  reducers: {
    toggleBill : (state) =>{
        state.isToggle = !state.isToggle
    },
   
  },
});

export default toggleBillSlice.reducer;

export const {toggleBill } = toggleBillSlice.actions;
