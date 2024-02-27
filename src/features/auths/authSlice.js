import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    setResetPasswordEmail: (state, action) => {
      const { email } = action.payload;
      state.resetPasswordEmail = email;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut, setResetPasswordEmail } =
  authSlice.actions;

export default authSlice.reducer;
