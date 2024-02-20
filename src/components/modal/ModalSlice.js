import { createSlice } from "@reduxjs/toolkit";
import PrivatePolicy from "../PrivatePolicy";
import ResetPasswordModal from "../../features/auths/ResetPasswordModal";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    modalContent: null,
    modalContentTitle: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = getModalComponent(action.payload);
      state.modalContentTitle = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
      state.modalContentTitle = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

const getModalComponent = (modalIdentifier) => {
  switch (modalIdentifier) {
    case "PRIVATE_POLICY_MODAL":
      return (
        <div className="max-w-[50rem] max-h-[50rem]">
          <PrivatePolicy />
        </div>
      );
    case "RESET_PASSWORD_MODAL":
      return <ResetPasswordModal />;

    default:
      return null;
  }
};

export default modalSlice.reducer;
