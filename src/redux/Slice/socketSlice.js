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
       state.socket = io(`http://${ip}:5000` , {transports : ['websocket']})
      
        // state.socket = io(process.env.REACT_APP_API , {transports : ['websocket']})
    }
  },
});

export default socketSlice.reducer;

export const {connectSocket} = socketSlice.actions;