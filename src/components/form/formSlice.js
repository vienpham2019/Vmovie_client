import { createSlice } from "@reduxjs/toolkit";

const initState = {
  movieFormData: {
    title: {
      value: "",
      validate: "",
    },
    dateRelease: {
      value: "",
      validate: "",
    },
    runtime: {
      value: "",
      validate: "",
    },
    rating: {
      value: "",
      validate: "",
      options: ["G", "PG", "PG_13", "R", "NC_17"],
    },
    genre: {
      value: [],
      validate: "",
      options: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Thriller",
        "War",
        "Western",
      ],
    },
    country: {
      value: [],
      validate: "",
    },
    language: {
      value: [],
      validate: "",
    },
    movieDetail: {
      value: "",
      validate: "",
    },
    thumbnail: {
      value: {},
      validate: "",
    },
    poster: {
      value: {},
      validate: "",
    },
    cast: {
      value: [],
      validate: "",
    },
    director: {
      value: [],
      validate: "",
    },
    producer: {
      value: [],
      validate: "",
    },
    writer: {
      value: [],
      validate: "",
    },
    studio: {
      value: [],
      validate: "",
    },
    photos: {
      value: [],
      validate: "",
    },
    trailer: {
      value: "",
      validate: "",
    },
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState: initState,
  reducers: {
    initMovieFormData: (state, action) => {
      state.movieFormData = { ...action.payload };
    },
    setMovieFormData: (state, action) => {
      const { name, value } = action.payload;
      state.movieFormData = { ...state.movieFormData, [name]: value };
    },
    resetMovieFormdata: (state, _) => {
      state.movieFormData = { ...initState.movieFormData };
    },
  },
});

export const { initMovieFormData, setMovieFormData, resetMovieFormdata } =
  formSlice.actions;

export default formSlice.reducer;
