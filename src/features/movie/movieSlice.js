import { createSlice } from "@reduxjs/toolkit";

const initState = {
  selectedMovie: null,
  tickets: {
    seats: [],
    prices: [],
    date: "",
    time: "",
    theaterName: "",
    subTotal: 0,
  },
  foodAndDrink: {
    products: [],
    subTotal: 0,
  },
};

const findExistingProduct = (products, payload) => {
  const { itemName: pl_itemName, selectedOptions: pl_options } = payload;
  return products.findIndex(
    ({ itemName: p_itemName, selectedOptions: p_options }) => {
      return (
        pl_itemName === p_itemName &&
        Object.keys(p_options).length === Object.keys(pl_options).length &&
        Object.entries(p_options).every(
          ([key, option]) => option === pl_options[key]
        )
      );
    }
  );
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initState,
  reducers: {
    setStateSelectedMovie: (state, action) => {
      return {
        ...state,
        selectedMovie: action.payload,
      };
    },
    setStateTickets: (state, action) => {
      return {
        ...state,
        tickets: action.payload,
      };
    },
    addFoodAndDrink: (state, action) => {
      const updateFoodAndDrink = JSON.parse(JSON.stringify(state.foodAndDrink));
      const existingProductIndex = findExistingProduct(
        updateFoodAndDrink.products,
        action.payload
      );

      if (existingProductIndex !== -1) {
        const existingProduct =
          updateFoodAndDrink.products[existingProductIndex];
        const updateAmount = Math.min(
          10,
          existingProduct.amount + action.payload.amount
        );
        updateFoodAndDrink.subTotal -=
          existingProduct.amount * existingProduct.price;
        existingProduct.amount = updateAmount;
        updateFoodAndDrink.subTotal += action.payload.price * updateAmount;
      } else {
        updateFoodAndDrink.products.push(action.payload);
        updateFoodAndDrink.subTotal +=
          action.payload.price * action.payload.amount;
      }

      return {
        ...state,
        foodAndDrink: { ...updateFoodAndDrink },
      };
    },

    deleteFoodAndDrink: (state, action) => {
      const updateFoodAndDrink = JSON.parse(JSON.stringify(state.foodAndDrink));
      const existingProductIndex = findExistingProduct(
        updateFoodAndDrink.products,
        action.payload
      );

      if (existingProductIndex === -1) return { ...state };

      updateFoodAndDrink.subTotal -=
        action.payload.price * action.payload.amount;

      updateFoodAndDrink.products.splice(existingProductIndex, 1);

      return {
        ...state,
        foodAndDrink: { ...updateFoodAndDrink },
      };
    },
    resetState: () => {
      return {
        ...initState,
      };
    },
  },
});

export const {
  setStateSelectedMovie,
  setStateTickets,
  addFoodAndDrink,
  deleteFoodAndDrink,
  resetState,
} = movieSlice.actions;

export default movieSlice.reducer;
