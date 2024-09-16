import { romzzApi } from "@/redux/api/api";
import { TPropertyResponse, TSinglePropertyResponse } from "@/types";

export const propertyApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getApproveProperties: build.query({
      query: () => ({
        url: "/properties/approved-properties",
        method: "GET",
      }),
      transformResponse: (response: TPropertyResponse) => {
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
        return response.data;
      },
      providesTags: ["property"],
    }),
    getSingleProperty: build.query({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TSinglePropertyResponse) => {
        return response;
      },
    }),
    getOtherProperty: build.query({
      query: (id) => ({
        url: `/properties/user-properties/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getPropertyHostDetails: build.query({
      query: (id) => ({
        url: `/users/partial-profile/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetApprovePropertiesQuery,
  useGetHighlightsPropertiesQuery,
  useGetSinglePropertyQuery,
  useGetOtherPropertyQuery,
  useGetPropertyHostDetailsQuery,
} = propertyApi;
