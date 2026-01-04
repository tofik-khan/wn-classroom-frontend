import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SnackbarSliceType = {
  type: "success" | "error";
  title?: string;
  content: string;
  open: boolean;
};

const initialState: SnackbarSliceType = {
  type: "success",
  title: "",
  content: "",
  open: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSuccessSnackbar: (
      state,
      action: PayloadAction<Partial<SnackbarSliceType>>
    ) => {
      return (state = {
        ...state,
        open: true,
        type: "success",
        ...action.payload,
      });
    },
    setErrorSnackbar: (
      state,
      action: PayloadAction<Partial<SnackbarSliceType>>
    ) => {
      return (state = {
        ...state,
        open: true,
        type: "error",
        ...action.payload,
      });
    },
    closeSnackbar: (state) => {
      return (state = initialState);
    },
  },
});

export const { setSuccessSnackbar, setErrorSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
