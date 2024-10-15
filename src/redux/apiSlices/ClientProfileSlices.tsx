import { romzzApi } from "../api/api";

const ClientProfileSlices = romzzApi.injectEndpoints({
    endpoints:(builder)=>({   

//  Booking History  
 getBookingHistory:builder.query({   
   query:(page)=>{  
      const params = new  URLSearchParams() 
      if(page)params.append("page",page)
   return{
      url:`/users/booked-properties?${params.toString()}`
   }}

 }) ,  

 createBookingPost:builder.mutation({
    query:(value)=>{
 return{
    url:"/properties" ,
    method:"POST" ,
    body:value
 }
    }
 }) ,  
 
 updatePost:builder.mutation({
   query:({id,formData})=>{
      return{
         url:`/properties/${id}`,
         method:"PATCH" ,
         body:formData
      }
   }
 }) ,
  
 getAllPost:builder.query({
   query:({id , page , type})=> {   
      const params = new URLSearchParams() 
      if(page)params.append("page",page) 
         if(type)params.append("type",type)
      return{ 
         url:`/properties/user-properties/${id}?${params.toString()}`
       } 
   }
 }) ,

 getFacilities:builder.query({
   query:()=>{
      return{
         url:"/facilities"
      }
   }
 }) , 

//  Subscription  
  getSubscription:builder.query({
   query:()=>({
      url:"/pricing-plans"
   })
  }) , 

  getAllSubscription:builder.query({
   query:()=>"/users/subscriptions"
  }) , 

  createFeedback: builder.mutation({
   query:(value)=>{ 
      return{
         url:"/feedbacks" ,
         method:"POST" ,
         body:value
      }

   }
  }) , 

//   profile progress  
getProgress:builder.query({
   query:()=>"/users/profile-progress"
})
  

      })
     })  
     export const {useGetBookingHistoryQuery , useCreateBookingPostMutation , useGetAllPostQuery , useUpdatePostMutation , useGetFacilitiesQuery  , useGetSubscriptionQuery , useGetAllSubscriptionQuery , useCreateFeedbackMutation , useGetProgressQuery} = ClientProfileSlices
