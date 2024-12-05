import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: '',
    refreshToken: ''
  },
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions

export default userSlice.reducer