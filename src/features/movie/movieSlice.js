import { createSlice } from "@reduxjs/toolkit";

const initState = {
  tickets: {
    item: "G7, G8, G9, H7, H8, H9, E1, E2, E3, E6, E7, E8",
    count: 12,
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
  const { item: pl_item, options: pl_options } = payload;
  return products.findIndex(
    ({ item: p_item, options: p_options }) =>
      p_item === pl_item &&
      p_options.length === pl_options.length &&
      p_options.every((option, index) => option === pl_options[index])
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
        const updateCount = Math.min(
          10,
          existingProduct.count + action.payload.count
        );
        updateFoodAndDrink.subTotal -=
          existingProduct.count * existingProduct.price;
        existingProduct.count = updateCount;
        updateFoodAndDrink.subTotal += action.payload.price * updateCount;
      } else {
        updateFoodAndDrink.products.push(action.payload);
        updateFoodAndDrink.subTotal +=
          action.payload.price * action.payload.count;
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
        action.payload.price * action.payload.count;

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
