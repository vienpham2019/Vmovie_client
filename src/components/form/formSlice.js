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
    generalAdmissionPrice: {
      value: "",
      validate: "",
    },
    childPrice: {
      value: "",
      validate: "",
    },
    seniorPrice: {
      value: "",
      validate: "",
    },
    IMDBScore: {
      value: "",
      validate: "",
    },
    RottenTomatoesScore: {
      value: "",
      validate: "",
    },
    TMDBScore: {
      value: "",
      validate: "",
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
  productFormData: {
    itemName: {
      value: "",
      validate: "",
    },
    price: {
      value: "",
      validate: "",
    },
    describe: {
      value: "",
      validate: "",
    },
    type: {
      value: "",
      validate: "",
      options: [],
    },
    imgUrl: {
      value: {},
      validate: "",
    },
    options: {
      value: [],
      validate: "",
    },
  },
  reviewFormData: {
    movieId: {
      value: "",
      validate: "",
    },
    type: {
      value: "",
      validate: "",
      options: ["TMDB", "Rotten_Tomatoes", "IMDB"],
    },
    reviewContent: {
      value: "",
      validate: "",
    },
    authorName: {
      value: "",
      validate: "",
    },
    authorCop: {
      value: "",
      validate: "",
    },
    date: {
      value: "",
      validate: "",
    },
    rating: {
      value: 5,
      validate: "",
    },
    fullReviewLink: {
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
    initProductFormData: (state, action) => {
      return {
        ...state,
        productFormData: action.payload,
      };
    },
    setProductFormData: (state, action) => {
      const { name, value } = action.payload;
      const updatedFormData = JSON.parse(JSON.stringify(state.productFormData));

      for (const key in updatedFormData) {
        updatedFormData[key].validate = "";
      }

      updatedFormData[name].value = value;

      return {
        ...state,
        productFormData: updatedFormData,
      };
    },
    resetProductFormdata: (state, _) => {
      return {
        ...state,
        id: null,
        productFormData: initState.productFormData,
      };
    },
    initReviewFormData: (state, action) => {
      return {
        ...state,
        reviewFormData: action.payload,
      };
    },
    setReviewFormData: (state, action) => {
      const { name, value } = action.payload;
      const updatedFormData = JSON.parse(JSON.stringify(state.reviewFormData));

      for (const key in updatedFormData) {
        updatedFormData[key].validate = "";
      }

      updatedFormData[name].value = value;

      return {
        ...state,
        reviewFormData: updatedFormData,
      };
    },
    resetReviewFormdata: (state, _) => {
      return {
        ...state,
        id: null,
        reviewFormData: initState.reviewFormData,
      };
    },
  },
});

export const {
  initMovieFormData,
  setMovieFormData,
  resetMovieFormdata,
  initProductFormData,
  setProductFormData,
  resetProductFormdata,
  initReviewFormData,
  setReviewFormData,
  resetReviewFormdata,
} = formSlice.actions;

export { initState as formInitState };

export default formSlice.reducer;
