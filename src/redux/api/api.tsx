import { getFromLocalStorage } from "@/util/localStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = getFromLocalStorage("romzzToken");
export const romzzApi = createApi({
  reducerPath: "romzzApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.102:5000/api/v1",
    headers: { Authorization: `Bearer ${token}` },
    //
  }),
  endpoints: () => ({}),
  tagTypes: ["Property", "Contact"],
});

export const imageUrl = "http://192.168.10.102:5000/";  
export const socketUrl = "http://192.168.10.102:5000"

