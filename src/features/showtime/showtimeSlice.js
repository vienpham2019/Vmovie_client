import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDay: "",
  selectedMovie: null,
  selectedMovieId: null,
  selectedTheater: null,
  showTimeList: [],
  countShowTime: {},
};

const showtimeSlice = createSlice({
  name: "showtime",
  initialState: initialState,
  reducers: {
    setKey: (state, action) => {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    },
    initState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setKey, initState, resetState } = showtimeSlice.actions;

export default showtimeSlice.reducer;
