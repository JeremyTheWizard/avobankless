import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import borrowSlice from "../slices/borrowSlice";
import createPoolSlice from "../slices/createPoolSlice";
import creditScoreDialogSlice from "../slices/creditScoreDialogSlice";
import othersSlice from "../slices/othersSlice";
import userPositionsSlice from "../slices/userPositionsSlice";
import withdrawSlice from "../slices/withdrawSlice";

export const store = configureStore({
  reducer: {
    creditScoreDialog: creditScoreDialogSlice,
    withdrawSlice: withdrawSlice,
    borrowSlice: borrowSlice,
    createPoolSlice: createPoolSlice,
    othersSlice: othersSlice,
    userPositionsSlice: userPositionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
