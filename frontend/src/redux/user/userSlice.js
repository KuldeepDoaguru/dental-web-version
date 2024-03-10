
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    refreshTable: false, // Add a new state for managing table refresh
    
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser : (state,action)=>{
             state.currentUser = action.payload;
        },
        clearUser : (state)=>{
             state.currentUser = null;
        },
        toggleTableRefresh: (state) => {
            state.refreshTable = !state.refreshTable;
        }
        
    }

})

export const {setUser,clearUser,toggleTableRefresh} = userSlice.actions;
export default userSlice.reducer;