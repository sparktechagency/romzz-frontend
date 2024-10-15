import { romzzApi } from "@/redux/api/api";

const termsApi = romzzApi.injectEndpoints({
    endpoints:(builder)=>({
        getTerm:builder.query({
            query:()=>"/terms-and-conditions"
        })
    })
}) 

export const {useGetTermQuery} = termsApi