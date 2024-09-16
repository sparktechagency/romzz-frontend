import { romzzApi } from "@/redux/api/api";

export const feedbackApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getFeedBackById: build.query({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "GET",
      }),

      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetFeedBackByIdQuery } = feedbackApi;
