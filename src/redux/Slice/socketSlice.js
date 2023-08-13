import { createSlice } from "@reduxjs/toolkit";

import { io } from "socket.io-client";


const initialState = {
    socket : null
};

//create account

const socketSlice = createSlice({
  name: "account",
  initialState,
  reducers : {
    connectSocket : (state) =>{
        state.socket = io(process.env.REACT_APP_API , {transports : ['websocket']})
    }
  },
});

export default socketSlice.reducer;

export const {connectSocket} = socketSlice.actions;