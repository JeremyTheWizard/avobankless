import { createSlice } from "@reduxjs/toolkit";

type Props = {
  withdraw: boolean;
  selectedPool: string;
  selectedPosition: string;
};

const initialState: Props = {
  withdraw: false,
  selectedPool: "",
  selectedPosition: "",
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
    setSelectedPool: (state, action) => {
      state.selectedPool = action.payload;
    },
    setSelectedPosition: (state, action) => {
      state.selectedPosition = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getWithdrawState = (state: { withdrawSlice: Props }) =>
  state.withdrawSlice;

// Exports all actions
export const {
  openWithdraw,
  closeWithdraw,
  setSelectedPool,
  setSelectedPosition,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
