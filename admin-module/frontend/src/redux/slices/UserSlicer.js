import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", id: null },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      console.log("User State after setUser:", state);
    },
    clearUser: (state) => {
      state.name = "";
      state.id = null;
    },
  },
});

// console.log(setUser);

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
