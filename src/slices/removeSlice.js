import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"

export let removelist=createAsyncThunk('removeitem',async(removeobj,thunkApi)=>{
    let res=await axios.delete(`http://localhost:5000/user/cartdelete/${removeobj.dishid}/${removeobj.email}`)
    let serverdata=res.data
if(serverdata.message=="dish removed from cart"){
       return serverdata.payload
    }else{
        return thunkApi.rejectWithValue(serverdata.message)
    }
})


export let removeSlice=createSlice({
    name:"remove",
    initialState:{removeobj:null,ispending:false,iserror:false,errmsg:""},
    reducers:{},
    extraReducers:{
        [removelist.pending]:(state,action)=>{
            state.ispending=true;
        },
        [removelist.fulfilled]:(state,action)=>{
            state.removeobj=action.payload;
            state.ispending=false;
            state.iserror=false;
            state.errmsg="";
        },
        [removelist.rejected]:(state,action)=>{
            state.ispending=false;
            state.iserror=true;
            state.errmsg=action.payload;
            state.cartobj=null;

        }
    }
})

//export action creator function
export const {}=removeSlice.actions;
// export reducer of todoslice
export default removeSlice.reducer;