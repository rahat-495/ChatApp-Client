
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id : "" ,
    name : "" ,
    email : "" ,
    token : "" ,
    profile_pic : "" ,
    onlineUser : [] ,
    socketConnection : null ,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state , action) => {
        state._id = action?.payload?._id ;
        state.name = action?.payload?.name ;
        state.email = action?.payload?.email ;
        state.profile_pic = action?.payload?.profile_pic ;
    },
    setToken : (state , action) => {
        state.token = action?.payload ;
    },
    logOut : (state , action) => {
        state._id = "" ;
        state.name = "" ;
        state.email = "" ;
        state.token = "" ;
        state.profile_pic = "" ;
        state.socketConnection = null ;
    },
    setOnlineUser : (state , action) => {
      state.onlineUser = action.payload ;
    },
    setSocketConnection : (state , action) => {
      state.socketConnection = action.payload ;
    }
  },
})

export const { setUser , setToken , logOut , setOnlineUser , setSocketConnection } = userSlice.actions ;
export default userSlice.reducer ;
