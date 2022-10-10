import { createSlice } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";

type Props = {
  borrow: boolean;
  selectedPool: string;
  userTotalBorrowed: number | undefined;
  repaymentAmount: BigNumber | undefined;
};

const initialState: Props = {
  borrow: false,
  selectedPool: "",
  userTotalBorrowed: undefined,
  repaymentAmount: undefined,
};

export const borrowSlice = createSlice({
  name: "borrowSlice",
  initialState,
  reducers: {
    openBorrow: (state) => {
      state.borrow = true;
    },
    closeBorrow: (state) => {
      state.borrow = false;
    },
    setSelectedPool: (state, action) => {
      state.selectedPool = action.payload;
    },
    dispatchTotalBorrowed: (state, action) => {
      state.userTotalBorrowed = action.payload;
    },
    dispatchRepaymentAmount: (state, action) => {
      state.repaymentAmount = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getBorrowState = (state: { borrowSlice: Props }) =>
  state.borrowSlice;

// Exports all actions
export const {
  openBorrow,
  closeBorrow,
  setSelectedPool,
  dispatchTotalBorrowed,
  dispatchRepaymentAmount,
} = borrowSlice.actions;

export default borrowSlice.reducer;
