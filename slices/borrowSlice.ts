import { createSlice } from "@reduxjs/toolkit";

type Props = {
  borrow: boolean;
  selectedPool: string;
};

const initialState: Props = {
  borrow: false,
  selectedPool: "",
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
  },
});

// A small helper of user state for `useSelector` function.
export const getBorrowState = (state: { borrowSlice: Props }) =>
  state.borrowSlice;

// Exports all actions
export const { openBorrow, closeBorrow, setSelectedPool } = borrowSlice.actions;

export default borrowSlice.reducer;
