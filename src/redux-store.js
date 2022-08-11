import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./slices/userSlice"
import adminSlice from "./slices/adminSlice"
import cartSlice from './slices/cartSlice'
import removeSlice from './slices/removeSlice'
import deleteSlice from './slices/deleteSlice'
export const store = configureStore({
    reducer: {
        users:userSlice,
        admin:adminSlice,
        cart:cartSlice,
        remove:removeSlice,
        delete:deleteSlice
    }
})