import { createSlice } from "@reduxjs/toolkit";

export interface CreditScoreDialog {
  dialogOpen: boolean;
  dialogStep: number;
  overflow: string;
}

const initialState: CreditScoreDialog = {
  dialogOpen: false,
  dialogStep: 0,
  overflow: "overflow-visible",
};

export const creditScoreDialogSlice = createSlice({
  name: "creditScoreDialog",
  initialState,
  reducers: {
    closeDialog: (state) => {
      state.dialogOpen = false;
      state.overflow = "overflow-visible";
    },
    openDialog: (state) => {
      state.dialogOpen = true;
      state.overflow = "overflow-hidden";
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
