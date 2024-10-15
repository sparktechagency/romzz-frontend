import { romzzApi } from "@/redux/api/api";

export const notificationApi = romzzApi.injectEndpoints({
    endpoints: (builder) => ({ 
 
        getNotification:builder.query({
            query:(page)=>{ 
                const params = new URLSearchParams() 
                if(page)params.append("page",page)
                return{
                    url:`/notifications?${params.toString()}`
                }
            }
        }) , 

        updateMakeAsSeen:builder.mutation({
 query:()=>{
    return{
        url:"/notifications/mark-as-seen" ,
        method:"PATCH",

    }
 }
        }) , 

        updateMarkAsRead:builder.mutation({
            query:()=>({
                url:"/notifications/mark-as-read",
                method:"PATCH"
            })
        })
     })
 }) 
 export const {useGetNotificationQuery , useUpdateMakeAsSeenMutation , useUpdateMarkAsReadMutation }=notificationApi