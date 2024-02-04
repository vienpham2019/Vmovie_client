import { createSlice } from "@reduxjs/toolkit";

export const notificationMessage = createSlice({
  name: "notificationMessage",
  initialState: {
    message: "",
    messageType: "",
    delayTime: 3000,
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

export default notificationMessage.reducer;
