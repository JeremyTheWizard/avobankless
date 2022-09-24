import { createSlice } from "@reduxjs/toolkit";

type Props = {
  yieldProjection: string;
};

const initialState: Props = {
  yieldProjection: "",
};

export const othersSlice = createSlice({
  name: "othersSlice",
  initialState,
  reducers: {
    setYieldProjection: (state, action) => {
      state.yieldProjection = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getOthersSlice = (state: { othersSlice: Props }) =>
  state.othersSlice;

// Exports all actions
export const { setYieldProjection } = othersSlice.actions;

export default othersSlice.reducer;
