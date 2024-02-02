import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/modal/ModalSlice";

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
});
