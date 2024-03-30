import { createSlice } from "@reduxjs/toolkit";

const initState = {
  id: null,
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
    awards: {
      value: "N/A",
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
    setFormDataId: (state, action) => {
      state.id = action.payload;
    },
    initMovieFormData: (state, action) => {
      let formData = JSON.parse(JSON.stringify(initState.movieFormData));
      let id = state.id;
      if (action.payload._id) {
        id = action.payload._id.value;
        delete action.payload._id;
      }
      Object.keys(action.payload).forEach((key) => {
        formData[key] = { ...formData[key], ...action.payload[key] };
      });

      return {
        ...state,
        id,
        movieFormData: formData,
      };
    },
    setMovieFormData: (state, action) => {
      const { name, value } = action.payload;
      const updatedFormData = JSON.parse(JSON.stringify(state.movieFormData));

      for (const key in updatedFormData) {
        updatedFormData[key].validate = "";
      }

      updatedFormData[name].value = value;

      return {
        ...state,
        movieFormData: updatedFormData,
      };
    },
    resetMovieFormdata: (state, _) => {
      return {
        ...state,
        id: null,
        movieFormData: initState.movieFormData,
      };
    },
  },
});

export const { initMovieFormData, setMovieFormData, resetMovieFormdata } =
  formSlice.actions;

export default formSlice.reducer;
