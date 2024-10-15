import { configureStore } from "@reduxjs/toolkit";
import userTokenReducer from './tokenSlice/TokenSlice'

export const store = configureStore({
    reducer:{
        userTokenReducer,
    }
})