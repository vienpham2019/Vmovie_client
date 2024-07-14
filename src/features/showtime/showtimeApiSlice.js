import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const showtimeAdapter = createEntityAdapter({});
const initState = showtimeAdapter.getInitialState();
export const showtimeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShowtimeByAdmin: builder.query({
      query: ({ page, limit, sortBy, sortDir, search }) => ({
        url: `/showtime/allByAdmin?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`,
      }),
      //keepUnusedDataFor: 5, default 60s
      transformResponse: (resData) => {
        const loadedShowtimes = resData.metadata.showtimes.map((showtime) => {
          showtime.id = showtime._id;
          return showtime;
        });
        const totalShowtimes = resData.metadata.totalShowtimes; // Assuming this property exists in the response

        return {
          showtime: showtimeAdapter.setAll(initState, loadedShowtimes),
          totalShowtimes,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Showtime", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Showtime", id })),
            { type: "Showtime", id: "TOTAL_COUNT" },
          ];
        } else
          return [
            { type: "Showtime", id: "LIST" },
            { type: "Showtime", id: "TOTAL_COUNT" },
          ];
      },
    }),
    getAllShowtimeTimeline: builder.query({
      query: ({ date, theaterName }) => ({
        url: `/showtime/timeline?date=${date}&theaterName=${theaterName}`,
      }),
    }),
    getShowtime: builder.query({
      query: ({ date, movieId, time }) => ({
        url: `/showtime/byDateAndTime?date=${date}&movieId=${movieId}&time=${time}`,
      }),
    }),
    getAllShowtimeByDate: builder.query({
      query: ({ date }) => ({
        url: `/showtime/all/${date}`,
      }),
    }),
    getAllShowtimeByMovie: builder.query({
      query: ({ movieId }) => ({
        url: `/showtime/allByMovie/${movieId}`,
      }),
    }),
    getAllShowtimeDates: builder.query({
      query: () => ({
        url: `/showtime/allDates`,
      }),
    }),
    countShowtimeDayByMovieId: builder.query({
      query: ({ movie }) => ({
        url: `/showtime/countShowtimeDay/${movie._id}`,
      }),
    }),
    createShowtime: builder.mutation({
      query: (payload) => ({
        url: `/showtime/new`,
        method: "POST",
        body: payload,
      }),
    }),
    checkoutShowtime: builder.mutation({
      query: (payload) => ({
        url: `/showtime/checkout`,
        method: "PATCH",
        body: payload,
      }),
    }),
    deleteShowtime: builder.mutation({
      query: ({ _id }) => ({
        url: `/showtime/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Showtime" },
        { type: "Showtime", id: "TOTAL_COUNT" },
      ],
    }),
  }),
});

export const {
  useGetAllShowtimeByAdminQuery,
  useGetAllShowtimeDatesQuery,
  useGetShowtimeQuery,
  useGetAllShowtimeTimelineQuery,
  useGetAllShowtimeByDateQuery,
  useGetAllShowtimeByMovieQuery,
  useCountShowtimeDayByMovieIdQuery,
  useCreateShowtimeMutation,
  useCheckoutShowtimeMutation,
  useDeleteShowtimeMutation,
} = showtimeApiSlice;
