import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleLiftSide: false,
};
const toggleLiftSideSlice = createSlice({
  name: "toggleLiftSide",
  initialState,
  reducers: {
    toggleLiftSide: (state) => {
      state.toggleLiftSide = !state.toggleLiftSide;
    },
  },
});
export default toggleLiftSideSlice.reducer;
export const { toggleLiftSide } = toggleLiftSideSlice.actions;
