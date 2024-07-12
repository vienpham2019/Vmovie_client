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
    products: [
      {
        item_name: "XL Refillable Popcorn",
        amount: 4,
        price: 9.95,
        options: [{ name: "butter_options", selection: "Regular Butter" }],
      },
      {
        item_name: "Large Popcorn & Drink Combo",
        amount: 1,
        price: 14.8,
        options: [
          { name: "butter_options", selection: "No Added Butter" },
          { name: "ice_options", selection: "No Ice" },
          { name: "fountain_flavors", selection: "Dr Pepper" },
        ],
      },
      {
        item_name: "Large Popcorn & 2 Large Drinks Combo",
        amount: 1,
        price: 21.25,
        options: [
          { name: "butter_options", selection: "No Added Butter" },
          { name: "ice_options#1", selection: "Light Ice" },
          { name: "fountain_flavors#1", selection: "Hi-C Fruit Punch" },
          { name: "ice_options#2", selection: "Light Ice" },
          { name: "fountain_flavors#2", selection: "Hi-C Fruit Punch" },
        ],
      },
    ],
    subTotal: 0,
  },
  subTotal: 0,
};

const findExistingProduct = (products, payload) => {
  const { item_name: pl_item_name, options: pl_options } = payload;
  return products.findIndex(
    ({ item_name: p_item_name, options: p_options }) =>
      pl_item_name === p_item_name &&
      p_options.length === pl_options.length &&
      p_options.every(
        (option, index) => option.selection === pl_options[index].selection
      )
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
        subTotal: updateFoodAndDrink.subTotal + state.tickets.subTotal,
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
        subTotal: updateFoodAndDrink.subTotal + state.tickets.subTotal,
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
