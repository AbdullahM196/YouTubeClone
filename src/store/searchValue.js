import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "MERN Stack",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
