
import { createSlice } from "@reduxjs/toolkit";
const initialState:{userToken:null|string}={
    userToken:window.localStorage.getItem("token")||null
}
const tokenSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        clearUserToken:(state)=>{
            state.userToken=null
        },
        getUserToken:(state,action)=>{
            state.userToken=action.payload
            console.log(action.payload);
            
        }
    }
})

export default tokenSlice.reducer;
export const {getUserToken} = tokenSlice.actions