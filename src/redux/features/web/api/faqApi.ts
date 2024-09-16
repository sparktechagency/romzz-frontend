import { romzzApi } from "@/redux/api/api";
import { ApiResponse } from "@/types";
import { TFaq } from "@/types/common";

export const faqApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getFaqs: build.query({
      query: () => ({
        url: `/faqs`,
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<TFaq[]>) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetFaqsQuery } = faqApi;
