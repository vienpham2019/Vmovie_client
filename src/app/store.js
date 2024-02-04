import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/modal/ModalSlice";
import notificationMessageReducer from "../components/notificationMessage/notificationMessageSlice";

export default configureStore({
  reducer: {
    modal: modalReducer,
    notificationMessage: notificationMessageReducer,
  },
});
