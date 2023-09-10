import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API";
import { Notificationz } from "../../components/Notification/Notification";

const initialState = {
  listAccount : [],
  getOrder:{
    listOrder:[],
    isLoading : false,
    profit:null,
    totalOrders:null,
    productsSold:null
  },
  pagination :{
    totalItem : null
  },
  isLoading : false,
  createAcc :{
    isLoading : false,
  },
  deleteAcc :{
    error : null
  },
};

//get all user
const getAllAccount = createAsyncThunk(
    '/acc/getAll',
    async (data) =>{
        try {
            const newData = {
                ...data,
                limit : 10
            }
            const qs = "?" + new URLSearchParams(newData).toString()
            const response = await API.get(`/acc${qs}`)
            return response.data
        } catch (error) {
            return error
        }
    }
)
//create account
const createAccount = createAsyncThunk(
    '/acc/createAcc',
    async ({dataForm , setToggleForm} ,{rejectWithValue}) =>{
        try {
            const response = await API.post('/acc/register',dataForm)
            return {response: response.data , setToggleForm}
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
//delete account
const deleteAccount = createAsyncThunk(
    '/acc/delete',
    async (id ,{rejectWithValue}) =>{
        try {
            const response = await API.delete(`/acc/${id}`)
            return {...response.data,id}
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
//update account
const updateAccount = createAsyncThunk(
    '/acc/update',
    async ({id , dataForm ,setToggleForm} ,{rejectWithValue}) =>{
        try {
            const response = await API.put(`/acc/update/${id}`,dataForm)
            return {response: response.data , setToggleForm}
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
// get order by name
const getOrderByName = createAsyncThunk(
    'account/getOrderByName',
    async (data,{rejectWithValue}) => {
      try {
        let {page,fullName} = data;
        
        const start = new Date(new Date().getFullYear(),new Date().getMonth()-1,1);
        const end = new Date(new Date().getFullYear(),new Date().getMonth() + 1,0);
        let newData = {
          start,
          end,
          limit : 500,
          page : page,
          sortBy : "created_at",
          sortType: "decs",
          fullName
        }
        const qs = "?" + new URLSearchParams(newData).toString()
        const response = await API.get(`/acc/order${qs}`)
        return response.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers : {
  },
  extraReducers : builder =>{
    //get all account
    builder.addCase(getAllAccount.pending , (state) =>{
        state.isLoading = true
    })
    builder.addCase(getAllAccount.fulfilled , (state,action) =>{
        state.isLoading = false
        state.listAccount = action.payload.data
        state.pagination.totalItem = action.payload.pagination.totalItem
    })
    builder.addCase(getAllAccount.rejected , (state,action) =>{
        state.isLoading = false
        console.log(action.payload);
    })
    //create account
    builder.addCase(createAccount.pending, (state) =>{
        state.createAcc.isLoading = true
    })
    builder.addCase(createAccount.fulfilled, (state,action) =>{
        state.createAcc.isLoading = false;
        const {response,setToggleForm} = action.payload
        state.listAccount.unshift(response)
        Notificationz("Create Success !!!")
        setToggleForm(false)

    })
    builder.addCase(createAccount.rejected, (state,action) =>{
        state.createAcc.isLoading = false;
        if(action.payload.code === "ERR_BAD_REQUEST"){
            Notificationz(action.payload.response.data.message,"error")
        }
        else{
            Notificationz("Server Error!!!","error")
        }
    })
    //delete account
    builder.addCase(deleteAccount.fulfilled,(state,action) =>{
        const newList = state.listAccount.filter(item => item._id !== action.payload.id)
        state.listAccount = newList
        console.log(action.payload);
    })
    builder.addCase(deleteAccount.rejected,(state,action) =>{
        // state.deleteAcc.error = action.payload.response.data.message
        console.log(action.payload);
    })
    //update account
    builder.addCase(updateAccount.pending,(state) =>{
        state.createAcc.isLoading = true

    })
    builder.addCase(updateAccount.fulfilled,(state,action) =>{
        state.createAcc.isLoading = false
        const {response,setToggleForm = () =>{}} = action.payload
        const {data} = response;
        const index = state.listAccount.findIndex(item => item._id === data._id)
        state.listAccount.splice(index,1,data)
        Notificationz("Update Account Success !!!")
        setToggleForm(false)
        
    })
    builder.addCase(updateAccount.rejected,(state,action) =>{
        state.createAcc.isLoading = false
        if(action.payload.code === "ERR_BAD_REQUEST"){
            state.createAcc.error = 
            Notificationz(action.payload.response.data.message,'error')
        }
        else{
            Notificationz("Server Error !!!",'error')
        }
    })
    //get order by name
    builder.addCase(getOrderByName.pending,(state) =>{
       state.getOrder.isLoading = true

    })
    builder.addCase(getOrderByName.fulfilled,(state,action) =>{
        state.getOrder.isLoading = false
        const {data,countProductSold,profit,totalItem} = action.payload
        state.getOrder.listOrder = data
        state.getOrder.profit = profit
        state.getOrder.productsSold=countProductSold
        state.getOrder.totalOrders=totalItem
    })
    builder.addCase(getOrderByName.rejected,(state,action) =>{
        console.log(action.payload);
        state.getOrder.isLoading = false
    })
  }
});

export default accountSlice.reducer;

export {getAllAccount,createAccount,deleteAccount,updateAccount,getOrderByName}