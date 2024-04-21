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
  productFormData: {
    item_name: {
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
    img: {
      value: {},
      validate: "",
    },
    PO: {
      value: [],
      validate: "",
    },
    type: {
      value: "",
      validate: "",
      options: [
        "Combo",
        "Popcorn",
        "Fountain_Drinks",
        "Bottled_Drinks",
        "Candy",
        "Snacks",
        "Ice_Cream",
      ],
    },
  },
};

//   //   {
//     item_name: "Large Popcorn & Drink Combo",
//     price: 14.8,
//     describe:
//       "Tub of buttered Orville Redenbacher's light and fluffy popcorn & a Large fountain beverage of your choice from a variety of Coca-Cola® products.",
//     img: "https://www.cinemark.com/media/76011403/400x225-siat-combo1.jpg",
//     OPT: [
//       {
//         name: "butter_options",
//         options: butter_OPT,
//       },
//       {
//         name: "ice_options",
//         options: ice_OPT,
//       },
//       {
//         name: "fountain_flavors",
//         options: fountain_OPT,
//       },
//     ],
//   },

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
