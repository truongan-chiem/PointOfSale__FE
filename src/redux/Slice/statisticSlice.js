import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import API from "../../API";

const initialState = {
  banking:{
    value : 0,
    percent : 0
  },
  cash:{
    value : 0,
    percent : 0
  },
  productSold:{
    value : 0,
    percent : 0
  },
  revenue:{
    value : 0,
    percent : 0
  },
  totalBills:{
    value : 0,
    percent : 0
  },
  dataChart : [],
  isLoading : false,
  dataTrending :[],
  dataOutOfStock : []
};

const getStatistic = createAsyncThunk(
  'statistic',
  async (data,{rejectWithValue}) => {
    try {
      let {start,end} = data;
      start = format(start, 'yyyy-MM-dd');
      end = format(end, 'yyyy-MM-dd');
      const response = await API.get(`/statistic?start=${start}&end=${end}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
  )

const getTrendingProduct = createAsyncThunk(
  'statistic/trending',
  async (_,{rejectWithValue}) =>{
    try {
      const response = await API.get(`/statistic/trending`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const getOutOfStock = createAsyncThunk(
  'statistic/outofstock',
  async (_,{rejectWithValue}) =>{
    try {
      const response = await API.get(`/statistic/outofstock`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  extraReducers : builder =>{
    //get statisitc
    builder.addCase(getStatistic.pending , (state) =>{
      state.isLoading = true
    })
    builder.addCase(getStatistic.fulfilled , (state,action) =>{
      state.isLoading = false
      const {banking,cash,dataChart,totalBills,revenue,productSold} = action.payload
      state.banking = banking
      state.cash = cash
      state.dataChart = dataChart
      state.totalBills = totalBills
      state.revenue = revenue
      state.productSold = productSold
    })
    builder.addCase(getStatistic.rejected , (state,action) =>{
      state.isLoading = false
      console.log(action.payload);
    })
    //get trending
    builder.addCase(getTrendingProduct.pending ,(state) =>{
      state.isLoading = true
    })
    builder.addCase(getTrendingProduct.fulfilled ,(state,action) =>{
      state.isLoading = false
      state.dataTrending = action.payload
    })
    builder.addCase(getTrendingProduct.rejected ,(state,action) =>{
      state.isLoading = false;
      console.log(action.payload);
    })
    //get OutOfStock
    builder.addCase(getOutOfStock.pending ,(state) =>{
      state.isLoading = true
    })
    builder.addCase(getOutOfStock.fulfilled ,(state,action) =>{
      state.isLoading = false
      state.dataOutOfStock = action.payload
    })
    builder.addCase(getOutOfStock.rejected ,(state,action) =>{
      state.isLoading = false;
      console.log(action.payload);
    })
  }
});

export default statisticSlice.reducer;

export {getStatistic,getTrendingProduct,getOutOfStock};