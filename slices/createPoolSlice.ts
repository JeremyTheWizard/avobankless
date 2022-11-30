import { createSlice } from "@reduxjs/toolkit";

type Props = {
  isLoans: boolean;
  open: boolean;
};

const initialState: Props = {
  isLoans: false,
  open: false,
};

export const createPoolSlice = createSlice({
  name: "createPoolSlice",
  initialState,
  reducers: {
    dispatchIsLoans: (state, action: { payload: boolean; type: string }) => {
      state.isLoans = action.payload;
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
export const { dispatchIsLoans, toggleOpen } = createPoolSlice.actions;

export default createPoolSlice.reducer;
