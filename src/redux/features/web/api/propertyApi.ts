import { romzzApi } from "@/redux/api/api";
import { TPropertyResponse, TSinglePropertyResponse } from "@/types";
import { TQueryParam } from "@/types/common";

export const propertyApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getApproveProperties: build.query({
      query: ({args ,page , search , area , filter}) => { 
        //console.log("filter", filter); 
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          }); 
        }  
        if(search)params.append("searchTerm" ,search) 
          if(area)params.append("searchTerm",area) 
            if(page)params.append("page" ,page) 

            // filters  
            if(filter?.location)params.append("searchTerm", filter?.location ) 
            if(filter?.area)params.append("searchTerm", filter?.area ) 
            if(filter?.price)params.append("price", filter?.price ) 
            if(filter?.bedType)params.append("bedType", filter?.bedType ) 
            if(filter?.sort)params.append("sort", filter?.sort ) 
            if(filter?.decorated)params.append("decorationType", filter?.decorated ) 
            if(filter?.propertyType)params.append("propertyType", filter?.propertyType ) 
            if(filter?.priceType)params.append("priceType", filter?.priceType)  
            if(filter?.gender)params.append("allowedGender", filter?.gender)  
            if(filter?.occupation)params.append("occupation", filter?.occupation)  
            if(filter?.facilities)params.append("facilities", filter?.facilities)   
            if(filter?.category)params.append("category", filter?.category)    
              

        return {
          url: `/properties/approved-properties?${params.toString()}`,  
        };
      },
      transformResponse: (response: TPropertyResponse) => {
        return { data: response.data.data, meta: response.data.meta };
      },
      providesTags: ["Property"],
    }),
    getHighlightsProperties: build.query({
      query: () => ({
        url: "/properties/approved-properties?page=1&limit=4",
        method: "GET",
      }),
      transformResponse: (response: TPropertyResponse) => {
        return response.data;
      },
      providesTags: ["Property"],
    }),
    getSingleProperty: build.query({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TSinglePropertyResponse) => {
        return response;
      },
    }),
    getOtherProperty: build.query({
      query: (id) => ({
        url: `/properties/user-properties/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getPropertyHostDetails: build.query({
      query: (id) => ({
        url: `/users/partial-profile/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetApprovePropertiesQuery,
  useGetHighlightsPropertiesQuery,
  useGetSinglePropertyQuery,
  useGetOtherPropertyQuery,
  useGetPropertyHostDetailsQuery,
} = propertyApi;
