import { createSlice } from "@reduxjs/toolkit";
import PrivatePolicy from "../PrivatePolicy";
import ResetPasswordModal from "../../features/auths/ResetPasswordModal";
import VideoModal from "../form/VideoModal";
import MovieCheckOutSummaryModal from "../../features/movie/MovieCheckOutSummaryModal";
import ProductOptionsModal from "../../features/product/ProductOptionsModal";
import ConfirmModal from "./ConfirmModal";
import ProductDetailModal from "../../features/product/ProductDetailModal";
import TheaterLayoutModal from "../../features/theater/TheaterLayoutModal";
import SelectMoviesModal from "../../features/movie/SelectMoviesModal";
import AddImageUrlModal from "../../features/movie/AddImageUrlModal";

const initState = {
  isModalOpen: false,
  modalContentTitle: null,
  modalParams: null,
  modalResponse: null,
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
    setModalResponse: (state, action) => {
      state.modalResponse = action.payload;
    },
    clearModalResponse: (state) => {
      state.modalResponse = null;
    },
    closeModal: (state) => {
      return {
        ...initState,
        modalResponse: state.modalResponse,
      };
    },
  },
});

export const {
  openModal,
  closeModal,
  setModalParams,
  setModalResponse,
  clearModalResponse,
} = modalSlice.actions;

const modalComponentEnum = Object.freeze({
  PRIVATE_POLICY: "PRIVATE_POLICY",
  RESET_PASSWORD: "RESET_PASSWORD",
  VIDEO: "VIDEO",
  FOOD_AND_DRINK: "FOOD_AND_DRINK",
  PRODUCT_DETAIL: "PRODUCT_DETAIL",
  CHECKOUT_SUMMARY: "CHECKOUT_SUMMARY",
  PRODUCT_OPTION: "PRODUCT_OPTION",
  CONFIRM: "CONFIRM",
  SELECT_MOVIE: "SELECT_MOVIE",
  THEATER_LAYOUT: "THEATER_LAYOUT",
  ADD_IMAGE_URL: "ADD_IMAGE_URL",
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
    case modalComponentEnum.PRODUCT_DETAIL:
      return <ProductDetailModal />;
    case modalComponentEnum.CHECKOUT_SUMMARY:
      return <MovieCheckOutSummaryModal />;
    case modalComponentEnum.PRODUCT_OPTION:
      return <ProductOptionsModal />;
    case modalComponentEnum.CONFIRM:
      return <ConfirmModal />;
    case modalComponentEnum.SELECT_MOVIE:
      return <SelectMoviesModal />;
    case modalComponentEnum.THEATER_LAYOUT:
      return <TheaterLayoutModal />;
    case modalComponentEnum.ADD_IMAGE_URL:
      return <AddImageUrlModal />;
    default:
      return null;
  }
};

export { getModalComponent, modalComponentEnum };

export default modalSlice.reducer;
