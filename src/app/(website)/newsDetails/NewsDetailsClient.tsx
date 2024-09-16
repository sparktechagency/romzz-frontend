"use client";
import Image from "next/image";
import React from "react";
// import Details from "@/assets/newsDetails.png";
import Heading from "@/components/shared/Heading";
import { useGetSingleBlogQuery } from "@/redux/features/web/api/blogApi";
import { imageUrl } from "@/redux/api/api";

const NewsDetailsClient = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleBlogQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container my-10">
      <div className="w-full h-[456px] relative">
        <Image
          alt="new details"
          src={`${imageUrl}${data?.image}`}
          fill
          // style={{objectFit: "contain"}}
        />

        <div
          className="absolute left-0 -bottom-4 bg-white lg:w-[450px] w-full lg:rounded-r-3xl rounded-r-xl py-2"
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <Heading
            name={data?.title}
            style="font-normal lg:text-[32px] text-[24px] text-center   leading-[48px] text-[#3E3E3E]"
          />
        </div>
      </div>

      <p className="text-[#767676] text-[16px] leading-[21px] font-normal mt-10">
        {data?.description}
      </p>
    </div>
  );
};

export default NewsDetailsClient;
