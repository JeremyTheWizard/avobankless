import { createSlice } from "@reduxjs/toolkit";

export interface CreditScoreDialog {
  dialogOpen: boolean;
  dialogStep: number;
}

const initialState: CreditScoreDialog = {
  dialogOpen: false,
  dialogStep: 0,
};

export const creditScoreDialogSlice = createSlice({
  name: "creditScoreDialog",
  initialState,
  reducers: {
    closeDialog: (state) => {
      state.dialogOpen = false;
    },
    openDialog: (state) => {
      state.dialogOpen = true;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getDialogState = (state: {
  creditScoreDialog: CreditScoreDialog;
}) => state.creditScoreDialog;

// Exports all actions
export const { closeDialog, openDialog } = creditScoreDialogSlice.actions;

export default creditScoreDialogSlice.reducer;
