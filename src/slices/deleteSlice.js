import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"

export let deletelist=createAsyncThunk('deleteitem',async(deleteobj,thunkApi)=>{
    let res=await axios.delete(`http://localhost:5000/user/deletecart/${deleteobj.email}`)
    let serverdata=res.data
if(serverdata.message=="all dish removed from cart"){
       return serverdata.payload
    }else{
        return thunkApi.rejectWithValue(serverdata.message)
    }
})


export let deleteSlice=createSlice({
    name:"delete",
    initialState:{deleteobj:null,ispending:false,iserror:false,errmsg:""},
    reducers:{},
    extraReducers:{
        [deletelist.pending]:(state,action)=>{
            state.ispending=true;
        },
        [deletelist.fulfilled]:(state,action)=>{
            state.deleteobj=action.payload;
            state.ispending=false;
            state.iserror=false;
            state.errmsg="";
        },
        [deletelist.rejected]:(state,action)=>{
            state.ispending=false;
            state.iserror=true;
            state.errmsg=action.payload;
            state.cartobj=null;

        }
    }
})

//export action creator function
export const {}=deleteSlice.actions;
// export reducer of todoslice
export default deleteSlice.reducer;