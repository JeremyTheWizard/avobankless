import { createSlice } from "@reduxjs/toolkit";

type Props = {
  borrow: boolean;
};

const initialState: Props = {
  borrow: false,
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
  },
});

// A small helper of user state for `useSelector` function.
export const getBorrowState = (state: { borrowSlice: Props }) =>
  state.borrowSlice;

// Exports all actions
export const { openBorrow, closeBorrow } = borrowSlice.actions;

export default borrowSlice.reducer;
