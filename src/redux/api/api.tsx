import { getFromLocalStorage } from "@/util/localStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = getFromLocalStorage("romzzToken");
export const romzzApi = createApi({
  reducerPath: "romzzApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://146.190.126.8:5005/api/v1",
    // baseUrl: "http://192.168.10.102:5000/api/v1",
    headers: { Authorization: `Bearer ${localStorage.getItem("romzzToken")}` },
    //
  }),
  endpoints: () => ({}),
  tagTypes: ["Property", "Contact", "user"],
});

export const imageUrl = "http://146.190.126.8:5005";  
// export const imageUrl = "http://192.168.10.102:5000/";  
export const socketUrl = "http://146.190.126.8:5005"
// export const socketUrl = "http://192.168.10.102:5000"

