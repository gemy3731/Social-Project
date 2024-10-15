import { configureStore } from "@reduxjs/toolkit";
import userTokenReducer from './tokenSlice/TokenSlice'
import postReducer from './postSlice/PostSlice'
export const store = configureStore({
    reducer:{
        userTokenReducer,
        postReducer
    }
})