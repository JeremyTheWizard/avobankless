import { createSlice } from "@reduxjs/toolkit";

type Props = {
  loans: undefined | [];
  open: boolean;
};

const initialState: Props = {
  loans: undefined,
  open: false,
};

export const createPoolSlice = createSlice({
  name: "createPoolSlice",
  initialState,
  reducers: {
    setLoans: (state, action) => {
      state.loans = action.payload;
    },

    toggleOpen: (state) => {
      state.open = !state.open;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getCreatePoolSlice = (state: { createPoolSlice: Props }) =>
  state.createPoolSlice;

// Exports all actions
export const { setLoans, toggleOpen } = createPoolSlice.actions;

export default createPoolSlice.reducer;
