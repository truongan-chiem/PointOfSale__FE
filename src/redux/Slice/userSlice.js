import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API";
import { Notificationz } from "../../components/Notification/Notification";

const initialState = {
    information : null,
    login: {
        isLoading : false,
        errorAPI : null,
    },
    update :{
        isLoading : false,
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
    async ({data,reset},{getState}) =>{
        const {_id} = getState().user.information;
        try {
            const response = await API.put(`/acc/changepw/${_id}`,data)
            return {response : response.data , reset }
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
    async ({dataForm,setToggleForm},{rejectWithValue,getState}) =>{
        const state = getState();
        try {
            const response = await API.put(`/acc/update/${state.user.information._id}`,dataForm)
            return {response : response.data,setToggleForm}
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
        sessionStorage.removeItem('user_id')
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
            sessionStorage.setItem('user_id',user._id)
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
        const {response,setToggleForm = () =>{}} = action.payload;
        const {success,data} = response
        if(success){
            state.information = data
            Notificationz("Update Profile Success!!!")
            setToggleForm(false)
        }
    })
    builder.addCase(updateInfo.rejected , (state,action) =>{
        state.update.isLoading = false
        Notificationz("Error API!!!" , "error")
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
        const {response,reset} = action.payload
        const {success = false , message} = response;
        if(success){
            Notificationz(message)
            reset();
        }
        else{
            Notificationz(message,'error')
        }
    })
  }
});

export default userSlice.reducer;
export const {resetError,logout,updateImage} = userSlice.actions
export {login,updateInfo,getInfoUser,changePassword}
