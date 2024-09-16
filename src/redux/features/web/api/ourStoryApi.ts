import { romzzApi } from "@/redux/api/api";
import { ApiResponse } from "@/types";
import { OurStory } from "@/types/common";

export const ourStoryApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getOurStory: build.query({
      query: () => ({
        url: `/our-story`,
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<OurStory[]>) => {
        return response.data[0];
      },
    }),
  }),
});

export const { useGetOurStoryQuery } = ourStoryApi;
