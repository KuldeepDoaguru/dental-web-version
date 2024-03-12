import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branch",
  initialState: { branch: null },
  reducers: {
    setBranch: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

// console.log(setUser);

export const { setBranch } = branchSlice.actions;
export default branchSlice.reducer;
