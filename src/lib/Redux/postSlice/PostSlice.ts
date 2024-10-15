
import { createSlice } from "@reduxjs/toolkit";
const initialState:{specificPost:boolean}={
    specificPost:false
}
const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setSpecificPost:(state,action)=>{
            state.specificPost=action.payload
        },
        // getUserToken:(state,action)=>{
        //     state.userToken=action.payload
        // }
    }
})

export default postSlice.reducer;
export const {setSpecificPost} = postSlice.actions