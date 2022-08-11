import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"

export let cartlist=createAsyncThunk('cartitem',async(cartobj,thunkApi)=>{
    let res=await axios.post("http://localhost:5000/user/cart",cartobj)
    let serverdata=res.data
if(serverdata.message=="item added to cart" || serverdata.message=="item added to exist"){
       return serverdata.payload
    }else{
        return thunkApi.rejectWithValue(serverdata.message)
    }
})


export let cartSlice=createSlice({
    name:"cart",
    initialState:{cartobj:null,ispending:false,iserror:false,errmsg:""},
    reducers:{},
    extraReducers:{
        [cartlist.pending]:(state,action)=>{
            state.ispending=true;
        },
        [cartlist.fulfilled]:(state,action)=>{
            state.cartobj=action.payload;
            state.ispending=false;
            state.iserror=false;
            state.errmsg="";
        },
        [cartlist.rejected]:(state,action)=>{
            state.ispending=false;
            state.iserror=true;
            state.errmsg=action.payload;
            state.cartobj=null;

        }
    }
})

//export action creator function
export const {}=cartSlice.actions;
// export reducer of todoslice
export default cartSlice.reducer;