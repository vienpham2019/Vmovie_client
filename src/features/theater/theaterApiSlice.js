import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const theaterAdapter = createEntityAdapter({});
const initState = theaterAdapter.getInitialState();
export const theaterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTheaterByAdmin: builder.query({
      query: ({ page, limit, sortBy, sortDir, search }) => ({
        url: `/theater/allTheaterByAdmin?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`,
        validateStatus: (res, result) => {
          return res.status >= 200 && res.status < 300;
        },
      }),
      //keepUnusedDataFor: 5, default 60s
      transformResponse: (resData) => {
        const loadedTheaters = resData.metadata.theaters.map((theater) => {
          theater.id = theater._id;
          return theater;
        });
        const totalTheaters = resData.metadata.totalTheaters; // Assuming this property exists in the response

        return {
          theaters: theaterAdapter.setAll(initState, loadedTheaters),
          totalTheaters,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Theater", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Theater", id })),
            { type: "Theater", id: "TOTAL_COUNT" },
          ];
        } else
          return [
            { type: "Theater", id: "LIST" },
            { type: "Theater", id: "TOTAL_COUNT" },
          ];
      },
    }),
    createTheater: builder.mutation({
      query: (payload) => ({
        url: "/theater/new",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Theater" }],
    }),
  }),
});

export const { useGetAllTheaterByAdminQuery, useCreateTheaterMutation } =
  theaterApiSlice;
