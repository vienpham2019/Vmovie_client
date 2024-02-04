import { createSlice } from "@reduxjs/toolkit";

export const notificationMessage = createSlice({
  name: "notificationMessage",
  initialState: {
    message: "Password and confirm password not match!",
    messageType: "Error",
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageType = state.payload.messageType;
    },
  },
});

export const { setMessage } = notificationMessage.actions;

export default notificationMessage.reducer;
