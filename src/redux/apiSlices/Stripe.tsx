import { romzzApi } from "../api/api";

const StripeSlices = romzzApi.injectEndpoints({
endpoints:(builder)=>({
  
    createIntent:builder.mutation({
        query:(value) =>{
            return{
 url:"/stripe/payments/create-intent" ,
 method:"POST" ,
 body: value
            }
        }
    })  ,

   confirmBooking:builder.mutation({
    query:(value)=>{
        return{
            url:`/bookings/confirm/${value?.id}` ,
            method:"POST" ,
            body: value
        }
    }
   })  , 

   createAccount:builder.mutation({
    query:()=>({
        url:"/stripe/connect-account" ,
        method:"POST"
    })
   })

})    
}) 

export const {useCreateIntentMutation , useConfirmBookingMutation , useCreateAccountMutation} = StripeSlices