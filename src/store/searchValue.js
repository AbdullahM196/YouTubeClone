import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "Egyptian web Development",
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
