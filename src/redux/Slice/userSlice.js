import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API";

const initialState = {
    information : null,
    login: {
        isLoading : false,
        errorAPI : null,
    },
    update :{
        isLoading : false,
        errorAPI :null,
        success : false
    },
    changepw :{
        success : null,
        message  :''
    }
};
//login account
const login = createAsyncThunk(
    'user/login',
    async (data,{rejectWithValue}) =>{
       try {
        const response = await API.post('/acc/login',data)
        return response.data
       } catch (error) {
        return rejectWithValue(error)
       }
    }
)
//change password account
const changePassword = createAsyncThunk(
    'user/changePw',
    async (data,{getState}) =>{
        const {_id} = getState().user.information;
        try {
            const response = await API.put(`/acc/changepw/${_id}`,data)
            return response.data 
        } catch (error) {
            return error
        }
    }
)
//getInfo user
const getInfoUser = createAsyncThunk(
    'user/getInfo',
    async(id,{rejectWithValue}) =>{
        try {
            const response = await API.get(`/acc/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
//update information
const updateInfo = createAsyncThunk(
    'user/update',
    async (dataForm,{rejectWithValue,getState}) =>{
        const state = getState();
        try {
            const response = await API.put(`/acc/update/${state.user.information._id}`,dataForm)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers : {
    resetError : (state) =>{
        state.login.errorAPI = null
    },
    logout : (state) =>{
        state.information = null
        localStorage.removeItem('user_id')
    },
    resetUpdateState : (state) =>{
        state.update.isLoading = false;
        state.update.errorAPI = null;
        state.update.success = false;

    },
    resetChangepw : state =>{
        state.changepw.success = null;
        state.changepw.message = ""
    },
    updateImage : (state , action) =>{
        state.information.image.url = action.payload
    }
  },
  extraReducers : builder =>{
    //login
    builder.addCase(login.pending , state =>{
        state.login.isLoading = true
    })
    builder.addCase(login.fulfilled , (state,action) =>{
        state.login.isLoading = false;
        const {success,user} = action.payload
        if(success){
            state.login.errorAPI = ""
            state.information = {...user}
            localStorage.setItem('user_id',user._id)
        }
    })
    builder.addCase(login.rejected ,(state,action) =>{
        state.login.isLoading = false;
        if(action.payload.code === "ERR_BAD_REQUEST"){
            state.login.errorAPI = action.payload.response.data.message
        }
        else{
            state.login.errorAPI = "Sever Error!!!"
        }
        console.log(action.payload);
    })

    //update information user
    builder.addCase(updateInfo.pending , (state) =>{
        state.update.isLoading = true
    })
    builder.addCase(updateInfo.fulfilled , (state,action) =>{
        state.update.isLoading = false
        const {success,data} = action.payload
        if(success){
            state.information = data
            state.update.success = true
        }
    })
    builder.addCase(updateInfo.rejected , (state,action) =>{
        state.update.isLoading = false
        console.log(action.payload);
        state.update.errorAPI = 'Error API'

    })

    //get information user
    builder.addCase(getInfoUser.fulfilled , (state,action) =>{
       state.information = action.payload
    })
    builder.addCase(getInfoUser.rejected , (state,action) =>{
       console.log(action.payload);
    })
    //change password
    builder.addCase(changePassword.fulfilled , (state,action) =>{
        const {success , message} = action.payload;
        state.changepw.success = success
        state.changepw.message = message
    })
  }
});

export default userSlice.reducer;
export const {resetError,logout,resetUpdateState,resetChangepw,updateImage} = userSlice.actions
export {login,updateInfo,getInfoUser,changePassword}
