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
    }),
    summary:builder.query({
      query:()=>"/users/summary",
      transformResponse: (data:any)=>{
        return data?.data
      } 
    })
  }),
});

export const { useGetFeedBackByIdQuery, useSummaryQuery, useGetHomePageFeedbackQuery } = feedbackApi;
