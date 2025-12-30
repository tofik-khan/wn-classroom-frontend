import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserSliceType = {
  currentUser: User;
};

const initialState: UserSliceType = {
  currentUser: {
    email: "",
    name: "Logged In User",
    _id: -1,
    role: "unregistered",
    isAuthorized: false,
    urduClass: "none",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setCurrentUserRole: (
      state,
      action: PayloadAction<"admin" | "substitute">
    ) => {
      state.currentUser.role = action.payload;
    },
  },
});

export const { setCurrentUser, setCurrentUserRole } = userSlice.actions;

export default userSlice.reducer;
