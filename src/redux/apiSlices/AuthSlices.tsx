

// const resetToken = getFromLocalStorage("resetToken") 

import { getFromLocalStorage } from "@/util/localStorage";
import { romzzApi } from "../api/api"; 

const resetToken = getFromLocalStorage("accessToken")

const authSlice = romzzApi.injectEndpoints({
    endpoints:(builder)=>({   
        
        // signUp page 
 signUp:builder.mutation({
    query:(data)=>{ 
        console.log(`user:${data}`);
        return{
            url:"/users/create-user" ,
            method:"POST" ,
            body:data
        }
    }
 }) ,  
  
 verifyOtp:builder.mutation({
query:(value)=>{
 return{
   url:"/auth/verify-otp" ,
   method:"POST" ,
   body:value
 }
}
 }) ,

 login:builder.mutation({
    query:(value)=>{
 return{
    url:"/auth/login" ,
    method:"POST" ,
    body:value
 }
    }
 })  ,

 forgetPass: builder.mutation({
   query:(value)=>{ 
      return{
         url:"/auth/forgot-password" ,
         method:"POST" ,
         body:value
      }
   }
 }) ,  

 resendEmail: builder.mutation({
   query:(value)=>({
      url:"/auth/resend-email" ,
      method:"POST" ,
      body:value
   })
 }) ,

 resetPass:builder.mutation({
   query:(value)=>({
      url:"/auth/reset-password" ,
      headers: {
         authorization: resetToken ? resetToken : "" 
       },
      method:"POST", 
      body: value
   })
 }) ,

 getProfile:builder.query({
   query:()=>"/users/profile"
 }) , 

 updateProfile:builder.mutation({
   query:(value)=>{ 
      console.log(value);
      return{
   url:"/users/update-profile" ,
   method:"PATCH" ,
   body:value
      }
   }
 }) ,

 changePass:builder.mutation({
   query:(value)=>{
      return{
         url:"/auth/change-password" ,
         method:"POST" ,
         body: value
      }
   }
 }) ,


     })
     }) 
export const {useSignUpMutation , useVerifyOtpMutation ,useLoginMutation , useForgetPassMutation , useResendEmailMutation , useResetPassMutation ,useGetProfileQuery ,useChangePassMutation ,useUpdateProfileMutation} = authSlice