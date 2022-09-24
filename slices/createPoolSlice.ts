import { createSlice } from "@reduxjs/toolkit";

type Props = {
  loans: undefined | [];
};

const initialState: Props = {
  loans: undefined,
};

export const createPoolSlice = createSlice({
  name: "createPoolSlice",
  initialState,
  reducers: {
    setLoans: (state, action) => {
      state.loans = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getCreatePoolSlice = (state: { createPoolSlice: Props }) =>
  state.createPoolSlice;

// Exports all actions
export const { setLoans } = createPoolSlice.actions;

export default createPoolSlice.reducer;
