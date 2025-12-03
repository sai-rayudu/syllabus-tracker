import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../services/api.js";

export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async ({email,password})=>{
     const data=await apiRequest("/login","POST",{email,password});
     return data
    }
);

const initialState={
    user:null,
    token:null,
    isLoggedIn:false
};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.isLoggedIn=true;
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
            state.isLoggedIn=false;
            localStorage.removeItem("token")
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            if(action.payload.token){
                state.user=action.payload.user;
                state.token=action.payload.token;
                state.isLoggedIn=true;
                localStorage.setItem("token",action.payload.token);
            }
        });
    }
});

export const {setCredentials,logout}=authSlice.actions;
export default authSlice.reducer;