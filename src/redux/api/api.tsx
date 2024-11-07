import { getFromLocalStorage } from "@/util/localStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = getFromLocalStorage("romzzToken");
export const romzzApi = createApi({
  reducerPath: "romzzApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://142.93.43.249:5000/api/v1",
    baseUrl: "http://103.145.138.199:5000/api/v1",
    headers: { Authorization: `Bearer ${localStorage.getItem("romzzToken")}` },
    //
  }),
  endpoints: () => ({}),
  tagTypes: ["Property", "Contact"],
});

// export const imageUrl = "http://142.93.43.249:5000/";  
export const imageUrl = "http://103.145.138.199:5000/";  
// export const socketUrl = "http://142.93.43.249:5000"
export const socketUrl = "http://103.145.138.199:5000"

