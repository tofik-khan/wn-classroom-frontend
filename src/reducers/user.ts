import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserSliceType = {
  currentUser: User | undefined;
};

const initialState: UserSliceType = {
  currentUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
