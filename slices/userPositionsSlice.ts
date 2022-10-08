import { createSlice } from "@reduxjs/toolkit";

type Props = {
  userTokenIds: string[];
  userDepositsTotal: number | undefined;
};

const initialState: Props = {
  userTokenIds: [""],
  userDepositsTotal: undefined,
};

export const userPositionsSlice = createSlice({
  name: "borrowSlice",
  initialState,
  reducers: {
    dispatchUserTokenIds: (state, action) => {
      state.userTokenIds = action.payload;
    },
    dispatchUserDepositsTotal: (state, action) => {
      state.userDepositsTotal = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getUserPositionsState = (state: { userPositionsSlice: Props }) =>
  state.userPositionsSlice;

// Exports all actions
export const { dispatchUserTokenIds, dispatchUserDepositsTotal } =
  userPositionsSlice.actions;

export default userPositionsSlice.reducer;
