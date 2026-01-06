import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserDetailsSlice"



const store =configureStore({
    reducer:{
        UserSlice:UserSlice,
    }
})

export default store