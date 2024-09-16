import { romzzApi } from "@/redux/api/api";
import { ApiResponse } from "@/types";
import { TBlog, TQueryParam } from "@/types/common";

export const blogApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/blogs`,
          method: "GET",
          params,
        };
      },

      transformResponse: (response: any) => {
        return { data: response.data.result, meta: response.data.meta };
      },
    }),
    getSingleBlog: build.query({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "GET",
        };
      },

      transformResponse: (response: ApiResponse<TBlog>) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetBlogsQuery, useGetSingleBlogQuery } = blogApi;
