import { romzzApi } from "@/redux/api/api";

export const getInTouchApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    sendGetInTouchEmail: build.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useSendGetInTouchEmailMutation } = getInTouchApi;
