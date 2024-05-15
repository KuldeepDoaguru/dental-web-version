
import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     currentUser: null,
//     refreshTable: false, // Add a new state for managing table refresh

// }

// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.currentUser = action.payload;
//         },
//         clearUser: (state) => {
//             state.currentUser = null;
//         },
//         toggleTableRefresh: (state) => {
//             state.refreshTable = !state.refreshTable;
//         }

//     }

// })

// export const { setUser, clearUser, toggleTableRefresh } = userSlice.actions; 
// export default userSlice.reducer;

const initialState = {
    user : null,
    refreshTable: false
}
const UserSlice = createSlice({

name: 'auth',
initialState,
reducers: {
    loginUser(state, action){
        state.user = action.payload;
        
    },
    logoutUser(state){
        state.user = null;

    }
    
}

})

export const {loginUser , logoutUser} =  UserSlice.actions;
export default UserSlice.reducer;
