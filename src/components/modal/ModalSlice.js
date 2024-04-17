import { createSlice } from "@reduxjs/toolkit";
import PrivatePolicy from "../PrivatePolicy";
import ResetPasswordModal from "../../features/auths/ResetPasswordModal";
import VideoModal from "../form/VideoModal";
import MovieFoodAndDrinkModal from "../../features/movie/MovieFoodAndDrinkModal";
import MovieCheckOutSummaryModal from "../../features/movie/MovieCheckOutSummaryModal";

const initState = {
  isModalOpen: false,
  modalContentTitle: null,
  modalParams: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContentTitle = action.payload;
    },
    setModalParams: (state, action) => {
      state.modalParams = action.payload;
    },
    closeModal: () => {
      return {
        ...initState,
      };
    },
  },
});

export const { openModal, closeModal, setModalParams } = modalSlice.actions;

const modalComponentEnum = Object.freeze({
  PRIVATE_POLICY: "PRIVATE_POLICY",
  RESET_PASSWORD: "RESET_PASSWORD",
  VIDEO: "VIDEO",
  FOOD_AND_DRINK: "FOOD_AND_DRINK",
  CHECKOUT_SUMMARY: "CHECKOUT_SUMMARY",
  // Add more roles as needed
});

const getModalComponent = (modalIdentifier) => {
  switch (modalIdentifier) {
    case modalComponentEnum.PRIVATE_POLICY:
      return (
        <div className="max-w-[50rem] max-h-[50rem] p-[1rem]">
          <PrivatePolicy />
        </div>
      );
    case modalComponentEnum.RESET_PASSWORD:
      return <ResetPasswordModal />;
    case modalComponentEnum.VIDEO:
      return <VideoModal />;
    case modalComponentEnum.FOOD_AND_DRINK:
      return <MovieFoodAndDrinkModal />;
    case modalComponentEnum.CHECKOUT_SUMMARY:
      return <MovieCheckOutSummaryModal />;
    default:
      return null;
  }
};

export { getModalComponent, modalComponentEnum };

export default modalSlice.reducer;
