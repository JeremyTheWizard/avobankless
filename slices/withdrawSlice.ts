import { createSlice } from "@reduxjs/toolkit";

type Props = {
  withdraw: boolean;
  selectedPool: string;
  selectedPositionInfo: {
    tokenId: string;
    available: string;
  };
  userAvailableTotal: string | undefined;
};

const initialState: Props = {
  withdraw: false,
  selectedPool: "",
  selectedPositionInfo: {
    tokenId: "",
    available: "",
  },
  userAvailableTotal: undefined,
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
      state.selectedPositionInfo = action.payload;
    },
    dispatchUserAvailableTotal: (state, action) => {
      state.userAvailableTotal = action.payload;
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
  dispatchUserAvailableTotal,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
