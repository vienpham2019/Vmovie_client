import { createSlice } from "@reduxjs/toolkit";

const initState = {
  tickets: {
    item_name: "G7, G8, G9, H7, H8, H9, E1, E2, E3, E6, E7, E8",
    amount: 12,
    price: 15,
    subTotal: 180,
  },
  foodAndDrink: {
    products: [],
    subTotal: 0,
  },
  subTotal: 180,
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
    setTickets: (state, action) => {
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

export const { setTickets, addFoodAndDrink, deleteFoodAndDrink, resetState } =
  movieSlice.actions;

export default movieSlice.reducer;
