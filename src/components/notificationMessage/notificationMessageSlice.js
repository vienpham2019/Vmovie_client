import { createSlice } from "@reduxjs/toolkit";

const notificationMessageEnum = Object.freeze({
  ERROR: "Error",
  SUCCESS: "Success",
  INFO: "Info",
  WARNING: "Warning",
  // Add more roles as needed
});

const initState = {
  message: "",
  messageType: "",
  delayTime: 5000,
};

export const notificationMessage = createSlice({
  name: "notificationMessage",
  initialState: initState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
      if (action.payload?.delayTime) {
        state.delayTime = action.payload.delayTime;
      }
    },
    resetMessage: () => {
      return {
        ...initState,
      };
    },
  },
});

export const { setMessage, resetMessage } = notificationMessage.actions;

export { notificationMessageEnum };

export default notificationMessage.reducer;
