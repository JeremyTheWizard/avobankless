import { createSlice } from "@reduxjs/toolkit";

type Props = {
  withdraw: boolean;
};

const initialState: Props = {
  withdraw: false,
};

export const withdrawSlice = createSlice({
  name: "withdrawSlice",
  initialState,
  reducers: {
    openWithdraw: (state) => {
      state.withdraw = true;
    },
    closeWithdraw: (state) => {
      state.withdraw = false;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getWithdrawState = (state: { withdrawSlice: Props }) =>
  state.withdrawSlice;

// Exports all actions
export const { openWithdraw, closeWithdraw } = withdrawSlice.actions;

export default withdrawSlice.reducer;
