import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// const productAdapter = createEntityAdapter({});
// const initState = productAdapter.getInitialState();
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductOptionTypes: builder.query({
      query: () => ({
        url: `/productOption/types`,
      }),
      providesTags: (result, err, arg) => {
        if (result?.metadata) {
          return [
            { type: "ProductOptionTypes", id: "LIST" },
            ...result.metadata.map((optionType) => ({
              type: "ProductOptionTypes",
              optionType,
            })),
          ];
        } else return [{ type: "ProductOptionTypes", id: "LIST" }];
      },
    }),
    getAllProductOptionsByType: builder.query({
      query: ({ type }) => ({
        url: `/productOption/options/${type}`,
      }),
      providesTags: (result, err, arg) => {
        if (result?.ids) {
          return [
            { type: "ProductOption", id: "LIST" },
            ...result.ids.map((id) => ({ type: "ProductOption", id })),
          ];
        } else return [{ type: "ProductOption", id: "LIST" }];
      },
    }),
    createProductOption: builder.mutation({
      query: (payload) => ({
        url: "/productOption/createOption",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "ProductOption", id: arg._id },
        { type: "ProductOptionTypes" },
      ],
    }),
    updateProductOption: builder.mutation({
      query: (payload) => ({
        url: "/productOption/updateOption",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [{ type: "ProductOption" }],
    }),
    deleteProductOption: builder.mutation({
      query: ({ _id }) => ({
        url: `/productOption/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "ProductOption" },
        { type: "ProductOptionTypes" },
      ],
    }),
  }),
});

export const {
  useGetAllProductOptionTypesQuery,
  useGetAllProductOptionsByTypeQuery,
  useCreateProductOptionMutation,
  useUpdateProductOptionMutation,
  useDeleteProductOptionMutation,
} = productApiSlice;
