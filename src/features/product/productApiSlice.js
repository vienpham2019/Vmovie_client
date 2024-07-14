import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const productAdapter = createEntityAdapter({});
const initState = productAdapter.getInitialState();
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductTypes: builder.query({
      query: () => ({
        url: `/product/allTypes`,
      }),
      providesTags: (result, err, arg) => {
        if (result?.metadata) {
          return [
            { type: "ProductTypes", id: "LIST" },
            ...result.metadata.map((optionType) => ({
              type: "ProductTypes",
              optionType,
            })),
          ];
        } else return [{ type: "ProductTypes", id: "LIST" }];
      },
    }),
    getProductDetails: builder.query({
      query: ({ _id }) => ({
        url: `/product/details/${_id}`,
      }),
    }),
    getAllProductByType: builder.query({
      query: ({ type }) => ({
        url: `/product/getAllProductByType/${type}`,
      }),
    }),
    getAllProductByAdmin: builder.query({
      query: ({ page, limit, sortBy, sortDir, filter, search }) => ({
        url: `/product/allProductByAdmin?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&filter=${filter}&search=${search}`,
        validateStatus: (res, result) => {
          return res.status >= 200 && res.status < 300;
        },
      }),
      //keepUnusedDataFor: 5, default 60s
      transformResponse: (resData) => {
        const loadedProducts = resData.metadata.products.map((product) => {
          product.id = product._id;
          return product;
        });
        const totalProducts = resData.metadata.totalProducts; // Assuming this property exists in the response

        return {
          products: productAdapter.setAll(initState, loadedProducts),
          totalProducts,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
            { type: "Product", id: "TOTAL_COUNT" },
          ];
        } else
          return [
            { type: "Product", id: "LIST" },
            { type: "Product", id: "TOTAL_COUNT" },
          ];
      },
    }),
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
    isOptionTypeExists: builder.mutation({
      query: ({ type }) => ({
        url: `/productOption/isOptionTypeExists/${type}`,
        method: "POST",
      }),
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
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product/new",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Product", id: arg._id },
        { type: "ProductTypes" },
      ],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, payload }) => ({
        url: `/product/edit/${_id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Product", id: arg._id },
        { type: "ProductTypes" },
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
    deleteProductById: builder.mutation({
      query: ({ _id }) => ({
        url: `/product/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Product" },
        { type: "ProductTypes" },
      ],
    }),
    deleteAllProductOptionByType: builder.mutation({
      query: ({ type }) => ({
        url: `/productOption/allType/${type}`,
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
  useIsOptionTypeExistsMutation,
  useGetAllProductByTypeQuery,
  useGetAllProductByAdminQuery,
  useGetProductDetailsQuery,
  useGetAllProductTypesQuery,
  useGetAllProductOptionTypesQuery,
  useGetAllProductOptionsByTypeQuery,
  useCreateProductMutation,
  useCreateProductOptionMutation,
  useUpdateProductMutation,
  useUpdateProductOptionMutation,
  useDeleteProductByIdMutation,
  useDeleteProductOptionMutation,
  useDeleteAllProductOptionByTypeMutation,
} = productApiSlice;
