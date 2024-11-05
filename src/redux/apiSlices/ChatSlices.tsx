import { romzzApi } from "../api/api";

const ChatSlices = romzzApi.injectEndpoints({
    endpoints:(builder)=>({

        createConversation:builder.mutation({
            query:()=>({
                url:"/conversations",
                method:"POST"
            })
        }) , 

        // get conversation  
        getMessages:builder.query({
            query:(id)=>{
                return{
                    url:`/conversations/${id}`
                }
            }
        }) , 

        sendMessage:builder.mutation({
            query:({userId , formData})=>{
                return{
                    url:`/messages/${userId}` ,
                    method:"POST" ,
                    body: formData
                }
            }
        })

    })
}) 

export const {useCreateConversationMutation , useGetMessagesQuery ,useSendMessageMutation} = ChatSlices