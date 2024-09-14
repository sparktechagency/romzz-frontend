import { romzzApi } from "@/redux/api/api";
import { TPropertyResponse } from "@/types";

export const propertyApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getApproveProperties: build.query({
      query: () => ({
        url: "/properties/approved-properties",
        method: "GET",
      }),
      transformResponse: (response: TPropertyResponse) => {
        // console.log(response);
        return response.data.data;
      },
      providesTags: ["property"],
    }),
    getHighlightsProperties: build.query({
      query: () => ({
        url: "/properties/approved-properties?page=1&limit=4",
        method: "GET",
      }),
      transformResponse: (response: TPropertyResponse) => {
        // console.log(response);
        return response.data;
      },
      providesTags: ["property"],
    }),
    // addBook: build.mutation({
    //   query: (data) => ({
    //     url: "/books",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Book"],
    // }),
    // updateBook: build.mutation({
    //   query: (args) => {
    //     console.log(args, "args from base api");
    //     return {
    //       url: `/books/${args.id}`,
    //       method: "PATCH",
    //       body: args.data,
    //     };
    //   },
    //   invalidatesTags: ["Book"],
    // }),
    // deleteBook: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/books/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["Book"],
    // }),
  }),
});

export const { useGetApprovePropertiesQuery, useGetHighlightsPropertiesQuery } =
  propertyApi;
