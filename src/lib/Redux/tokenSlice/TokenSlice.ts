import { createSlice } from "@reduxjs/toolkit";

const initialState:{userToken:null|string}={
    userToken:""
}
const tokenSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        clearUserToken:(state)=>{
            state.userToken=null
            localStorage.removeItem("token")
        },
        getUserToken:(state,action)=>{
            state.userToken=action.payload
        }
    }
})

export default tokenSlice.reducer;
export const {getUserToken,clearUserToken} = tokenSlice.actions