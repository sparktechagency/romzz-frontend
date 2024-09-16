import { romzzApi } from "@/redux/api/api";
import { TPropertyResponse, TSinglePropertyResponse } from "@/types";
import { TQueryParam } from "@/types/common";

export const propertyApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getApproveProperties: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/properties/approved-properties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TPropertyResponse) => {
        return { data: response.data.data, meta: response.data.meta };
      },
      providesTags: ["Property"],
    }),
    getHighlightsProperties: build.query({
      query: () => ({
        url: "/properties/approved-properties?page=1&limit=4",
        method: "GET",
      }),
      transformResponse: (response: TPropertyResponse) => {
        return response.data;
      },
      providesTags: ["Property"],
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
