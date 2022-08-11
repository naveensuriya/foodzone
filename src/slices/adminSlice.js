import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"

export let loginadmin=createAsyncThunk('adminlogin',async(usercredobj,thunkApi)=>{
    let res=await axios.post("http://localhost:5000/admin/login",usercredobj)
    let serverdata=res.data
    if(serverdata.message=="login successfully"){
       return serverdata.admin
    }else{
        return thunkApi.rejectWithValue(serverdata.message)
    }
})


export let adminSlice=createSlice({
    name:"admin",
    initialState:{adminobj:null,isadminlogin:false,ispending:false,iserr:false,errormsg:""},
    reducers:{
        adminlogout (state,action) {
            //remove the token in storage
state.adminobj=null;
state.iserr=false;
state.errormsg="";
state.isadminlogin=false;
        }
    },
    extraReducers:{
        [loginadmin.pending]:(state,action)=>{
            state.ispending=true;
        },
        [loginadmin.fulfilled]:(state,action)=>{
            state.adminobj=action.payload;
            state.ispending=false;
            state.isadminlogin=true;
            state.iserr=false;
            state.errormsg="";
        },
        [loginadmin.rejected]:(state,action)=>{
            state.ispending=false;
            state.iserr=true;
            state.errormsg=action.payload;
            state.adminobj=null;

        }
    }
})

//export action creator function
export const {adminlogout}=adminSlice.actions;
// export reducer of todoslice
export default adminSlice.reducer;