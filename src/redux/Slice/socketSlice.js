import { createSlice } from "@reduxjs/toolkit";

import { io } from "socket.io-client";


const initialState = {
    socket : null
};

//create socket slce

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers : {
    connectSocket : (state,action) =>{
        const ip = action.payload
        const  url = process.env.NODE_ENV !== "development" ? process.env.REACT_APP_API : `http://${ip}:5000`
        state.socket = io(url , {transports : ['websocket']})
    }
  },
});

export default socketSlice.reducer;

export const {connectSocket} = socketSlice.actions;