import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API";

const initialState = {
  product : {
    listProduct: [],
    isLoading : false,
  },
  bill :{
    orders: [],
  },
  setting : {
    isLoading : false,
    error : null
  },
  print_bill :{
    isLoading : false,
    error : null,
    success : false
  }
};

const getAllProduct = createAsyncThunk(
  'products/getAll',
  async () =>{
    const response = await API.get('/product')
    return response.data;
  }
)

const createNewProduct = createAsyncThunk(
  'products/addNewItem',
  async(data, {rejectWithValue}) =>{
    try {
      const response = await API.post('/product',data)
      return response.data
      
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const updateProduct = createAsyncThunk(
  'products/updateItem',
  async({_id,dataForm}, {rejectWithValue}) =>{
    try {
      const response = await API.put(`/product/${_id}`,dataForm)
      return response.data
      
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
  async({optionPayment,cash},{rejectWithValue,getState}) =>{
    const state = getState();
    let orders = state.products.bill.orders;
    let newOrders = []
    orders.forEach(element => {
      element = {...element , productId : element._id}
      newOrders.push(element)
    });

    const owenId = state.user.information._id;
    try {
      const data = { optionPayment , orders : newOrders , owenId , cash }
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
    resetErrorSetting : (state) =>{
      state.setting.error = null
    },
    clearBill : (state) =>{
      state.bill.orders = []
    }
  },
  extraReducers : builder =>{
    //getAllProduct
    builder.addCase(getAllProduct.pending , state =>{
      state.product.isLoading = true
    })
    builder.addCase(getAllProduct.fulfilled , (state,action) =>{
      state.product.isLoading = false
      state.product.listProduct = action.payload
    })
    //create new product
    builder.addCase(createNewProduct.pending , (state) =>{
      state.setting.isLoading = true
    } )
    builder.addCase(createNewProduct.fulfilled , (state,action)=>{
      const newItem = action.payload

      delete newItem.__v
      
      state.setting.isLoading = false
      state.product.listProduct.unshift(newItem)
      state.setting.error = ''
    })
    builder.addCase(createNewProduct.rejected , (state,action) =>{
      state.setting.error = action.payload.data
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
      const {data} = action.payload
    
      const index = state.product.listProduct.findIndex(item => item._id === data._id)
      
      state.product.listProduct.splice(index,1,data)
      
      state.setting.error = '';

    })
    builder.addCase(updateProduct.rejected,(state,action) =>{
      state.setting.isLoading = false
      state.setting.error = action.payload.data;
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

export const { addItemToBill ,plusNumber,minusNumber,resetErrorSetting,clearBill} = productSlice.actions;
export {getAllProduct,createNewProduct ,deleteProduct ,updateProduct,printBill};