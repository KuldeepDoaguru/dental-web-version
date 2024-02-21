import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", id: null },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    clearUser: (state) => {
      state.name = "";
      state.id = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
