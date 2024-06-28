import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const reviewAdapter = createEntityAdapter({});
const initState = reviewAdapter.getInitialState();
export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviewByAdmin: builder.query({
      query: ({ page, limit, sortBy, sortDir, search }) => ({
        url: `/review/all?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`,
      }),
      //keepUnusedDataFor: 5, default 60s
      transformResponse: (resData) => {
        const loadedReviews = resData.metadata.reviews.map((review) => {
          review.id = review._id;
          return review;
        });
        const totalReviews = resData.metadata.totalReviews; // Assuming this property exists in the response

        return {
          reviews: reviewAdapter.setAll(initState, loadedReviews),
          totalReviews,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Review", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Review", id })),
            { type: "Review", id: "TOTAL_COUNT" },
          ];
        } else
          return [
            { type: "Review", id: "LIST" },
            { type: "Review", id: "TOTAL_COUNT" },
          ];
      },
    }),
    getReviewDetails: builder.query({
      query: ({ _id }) => ({
        url: `/review/details/${_id}`,
        method: "GET",
      }),
    }),
    createReview: builder.mutation({
      query: (payload) => ({
        url: `/review/new`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Review" },
        { type: "Review", id: "TOTAL_COUNT" },
      ],
    }),
    updateReview: builder.mutation({
      query: ({ _id, payload }) => ({
        url: `/review/update/${_id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Review" },
        { type: "Review", id: "TOTAL_COUNT" },
      ],
    }),
    deleteReview: builder.mutation({
      query: (_id) => ({
        url: `/review/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Review" },
        { type: "Review", id: "TOTAL_COUNT" },
      ],
    }),
  }),
});

export const {
  useGetAllReviewByAdminQuery,
  useGetReviewDetailsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;
