import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/User"

let store = configureStore({
    reducer: {
        user: UserReducer
    }
})

export default store