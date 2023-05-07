import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import API from "../../API";

const initialState = {
  listData :[],
  isLoading : false
};

const getHistory = createAsyncThunk(
  'history/getAll',
  async (data,{rejectWithValue}) => {
    try {
      let {start,end} = data;
      start = format(start, 'yyyy-MM-dd');
      end = format(end, 'yyyy-MM-dd');
      const response = await API.get(`/history?start=${start}&end=${end}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const deleteOrder = createAsyncThunk(
  'history/deleteOrder',
  async(id) =>{
    const response = await API.delete(`/history/order/${id}`)
    return {...response.data,id}
  }
)

const historySlice = createSlice({
  name: "history",
  initialState,
  extraReducers : builder =>{
    //get order of history
    builder.addCase(getHistory.pending , (state) =>{
      state.isLoading = true
    })
    builder.addCase(getHistory.fulfilled , (state,action) =>{
      state.isLoading = false
      state.listData = action.payload
    })
    builder.addCase(getHistory.rejected , (state,action) =>{
      state.isLoading = false
    })
    //delete order
    builder.addCase(deleteOrder.fulfilled , (state ,action) =>{
      const {id} = action.payload;
      const newList = state.listData.filter(item => item._id !== id)
      state.listData = newList
    })
  }
});

export default historySlice.reducer;

export {getHistory,deleteOrder};