import { createSlice } from "@reduxjs/toolkit";

const notificationMessageEnum = Object.freeze({
  ERROR: "Error",
  SUCCESS: "Success",
  INFO: "Info",
  WARNING: "Warning",
  // Add more roles as needed
});

export const notificationMessage = createSlice({
  name: "notificationMessage",
  initialState: {
    message: "",
    messageType: "",
    delayTime: 5000,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
      if (action.payload?.delayTime) {
        state.delayTime = action.payload.delayTime;
      }
    },
    resetMessage: (state) => {
      state.message = "";
      state.messageType = "";
      state.delayTime = 3000;
    },
  },
});

export const { setMessage, resetMessage } = notificationMessage.actions;

export { notificationMessageEnum };

export default notificationMessage.reducer;
