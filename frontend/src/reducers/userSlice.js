import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice(
    {
        name:"user",
        initialState:{
            data:null
,       },
        reducers:{
            login(currentState,{payload}){
                currentState.data = payload.user
                localStorage.setItem('user',JSON.stringify(currentState))
            },
            logOut(currentState){
                currentState.data = null
               localStorage.removeItem('user')
            },
            lsToLogin(currentState){
                const lsUser = localStorage.getItem('user')
                if(lsUser != null){
                    const user = JSON.parse(lsUser)
                    
                    currentState.data = user.data
                }
            }
        }

    }
)

export const {login,logOut,lsToLogin} = userSlice.actions
export default userSlice.reducer