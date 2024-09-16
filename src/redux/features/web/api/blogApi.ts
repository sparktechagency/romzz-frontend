import { romzzApi } from "@/redux/api/api";
import { TQueryParam } from "@/types/common";

export const blogApi = romzzApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: (args) => {
        console.log(args);
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
  }),
});

export const { useGetBlogsQuery } = blogApi;
