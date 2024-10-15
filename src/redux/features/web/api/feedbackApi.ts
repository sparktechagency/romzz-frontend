import { romzzApi } from "@/redux/api/api";

export const feedbackApi = romzzApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedBackById: builder.query({
      query: (id) => ({
        url: `/feedbacks/${id}`,
      }), 
    }), 

    getHomePageFeedback:builder.query({
       query:()=>"/feedbacks/visible" 
    })
  }),
});

export const { useGetFeedBackByIdQuery  ,useGetHomePageFeedbackQuery } = feedbackApi;
