import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API";
import { Notificationz } from "../../components/Notification/Notification";

const initialState = {
  product : {
    listProduct: [],
    isLoading : false,
    haveData : true,
    changeTabType : false
  },
  bill :{
    orders: [],
  },
  setting : {
    isLoading : false,
    finish : false
  },
  print_bill :{
    isLoading : false,
    error : null,
    success : false
  }
};

const getAllProduct = createAsyncThunk(
  'products/getAll',
  async (data) =>{
    const qs = "?" + new URLSearchParams(data).toString()
    const response = await API.get(`/product${qs}`)
    return response.data;
  }
)

const createNewProduct = createAsyncThunk(
  'products/addNewItem',
  async({dataForm, resetForm}, {rejectWithValue}) =>{
    try {
      const response = await API.post('/product',dataForm)
      return {response : response.data , resetForm}
      
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const updateProduct = createAsyncThunk(
  'products/updateItem',
  async({_id,dataForm , setToggleFormEdit}, {rejectWithValue}) =>{
    try {
      const response = await API.put(`/product/${_id}`,dataForm)
      return {response : response.data , setToggleFormEdit}
      
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const deleteProduct = createAsyncThunk(
  'products/deleteItem',
  async(id, {rejectWithValue}) =>{
    try {
      const response = await API.delete(`/product/${id}`)
      
      return { id,...response.data}
      
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const printBill = createAsyncThunk(
  'printBill',
  async({optionPayment,cash,totalPrice},{rejectWithValue,getState}) =>{
    const state = getState();
    let orders = state.products.bill.orders;
    let newOrders = []
    orders.forEach(element => {
      element = {...element , productId : element._id}
      newOrders.push(element)
    });

    const owenId = state.user.information._id;
    try {
      const data = { optionPayment , orders : newOrders , owenId , cash ,totalPrice}
      const response = await API.post('/history/order',data)
      return {...response.data,orders : orders }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addItemToBill: (state, action) => {
      const itemOrder = state.product.listProduct.find((item) => item._id === action.payload._id);

      const existProduct = state.bill.orders.findIndex(item => item._id === action.payload._id)
      
      if(existProduct === -1){
  
        let newOrder = { ...itemOrder };
        delete newOrder.desc;
        delete newOrder.type;
        delete newOrder.__v;
        newOrder = {
          ...newOrder,
          number: 1
        };
        state.bill.orders.push(newOrder);
      }
      else{
        const itemInOrder = state.bill.orders[existProduct];

        state.bill.orders.splice(existProduct,1,{...itemInOrder, number : itemInOrder.number + 1})
      }

    },
    plusNumber : (state,action) =>{
      const id = action.payload;

      const item = state.bill.orders.find(item => item._id === id)
      let newItem = {...item,number:item.number + 1}
      
      const itemIndex = state.bill.orders.findIndex(item => item._id === id)
      state.bill.orders.splice(itemIndex,1,newItem)
    }
    ,
    minusNumber : (state,action) =>{
      const id = action.payload;

      const item = state.bill.orders.find(item => item._id === id)
      let newItem = {...item,number:item.number - 1}
      
      const itemIndex = state.bill.orders.findIndex(item => item._id === id)
      if(newItem.number === 0){
        state.bill.orders.splice(itemIndex,1)
      }
      else{
        state.bill.orders.splice(itemIndex,1,newItem)
      }
    }
    ,
    clearBill : (state) =>{
      state.bill.orders = []
    },
    changeTab : (state,action) =>{
      state.product.changeTabType = action.payload
    }
  },
  extraReducers : builder =>{
    //getAllProduct
    builder.addCase(getAllProduct.pending , state =>{
      state.product.isLoading = true
    })
    builder.addCase(getAllProduct.fulfilled , (state,action) =>{
      state.product.isLoading = false
      if(state.product.changeTabType){
        state.product.listProduct = action.payload
        state.product.haveData = true
      }
      else{
        if(action.payload.length > 0){
          state.product.haveData = true
          state.product.listProduct = [...state.product.listProduct, ...action.payload]
        }
        else{
          state.product.haveData = false;
        }
      }
    })
    //create new product
    builder.addCase(createNewProduct.pending , (state) =>{
      state.setting.isLoading = true
    } )
    builder.addCase(createNewProduct.fulfilled , (state,action)=>{
      const {response, resetForm} = action.payload

      const newItem = response
      delete newItem.__v
      
      state.setting.isLoading = false
      state.product.listProduct.unshift(newItem)
      Notificationz('Success!!!');
      resetForm();
    })
    builder.addCase(createNewProduct.rejected , (state,action) =>{
      Notificationz(action.payload.data.message , "error");
      state.setting.isLoading = false
    })
    //delete product
    builder.addCase(deleteProduct.fulfilled,(state,action) =>{
      const {id,success} = action.payload;
      if(success){
        const newMenu = state.product.listProduct.filter(item => item._id !== id)
        state.product.listProduct = newMenu
      }
    })
    //Update product
    builder.addCase(updateProduct.pending , (state) =>{
      state.setting.isLoading = true
    })
    builder.addCase(updateProduct.fulfilled,(state,action) =>{
      state.setting.isLoading = false
      const {response,setToggleFormEdit} = action.payload
      const {data} = response;
      const index = state.product.listProduct.findIndex(item => item._id === data._id)
      
      state.product.listProduct.splice(index,1,data)
      
      Notificationz("Update Product Success !!!")
      setToggleFormEdit(false);

    })
    builder.addCase(updateProduct.rejected,(state,action) =>{
      state.setting.isLoading = false
      Notificationz(action.payload.data.message,"error")

    })
    //printBill

    builder.addCase(printBill.pending, state =>{
      state.print_bill.isLoading = true
    })
    builder.addCase(printBill.fulfilled, (state,action) =>{
      state.print_bill.isLoading = false
      const {orders} = action.payload
      orders.forEach(item =>{
        const id = item._id
        const productItem = state.product.listProduct.find(itemPro => itemPro._id === id)
        const indexItem = state.product.listProduct.findIndex(itemPro => itemPro._id === id)
        const newItem = {...productItem,quantity : item.quantity - item.number}
        state.product.listProduct.splice(indexItem,1,newItem)
      })
    })
    builder.addCase(printBill.rejected, (state,action) =>{
      state.print_bill.isLoading = false
      console.log(action.payload);
    })
  }
});

export default productSlice.reducer;

export const { addItemToBill ,plusNumber,minusNumber ,clearBill,changeTab} = productSlice.actions;
export {getAllProduct,createNewProduct ,deleteProduct ,updateProduct,printBill};