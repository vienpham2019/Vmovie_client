import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/modal/ModalSlice";
import notificationMessageReducer from "../components/notificationMessage/notificationMessageSlice";
import authReducer from "../features/auths/authSlice";
import formReducer from "../components/form/formSlice";
import { apiSlice } from "./api/apiSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    notificationMessage: notificationMessageReducer,
    auth: authReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // concat apiSlice into redux middleware
  devTools: true,
});
