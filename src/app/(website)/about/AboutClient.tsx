"use client";
import Heading from "@/components/shared/Heading";
import Image from "next/image";
import React from "react";
import Amenities from "@/components/Amenities";
import { useGetOurStoryQuery } from "@/redux/features/web/api/ourStoryApi";
import { imageUrl } from "@/redux/api/api";
import NoContent from "@/components/shared/NoContent";

const AboutClient = () => {
  const { data } = useGetOurStoryQuery({});
  return (
    <div className=" pt-10">
      <div className="container lg:pb-0 pb-5 ">
        {/* heading  */}
        <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] mb-6">
          Our <span className="text-primary">Story</span>
        </Heading>

        {data ? (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div className=" ">
              <p className="text-[#5C5C5C] text-[19px] leading-3 font-medium">
                {data?.title}
              </p>
              <br />
              <p className="text-[#5C5C5C] font-normal text-[14px] leading-5">
                {data?.storyDetails}
              </p>
            </div>

            <div className=" lg:h-[455px] h-full w-full lg:w-[607px] ">
              {data?.image && (
                <Image
                  alt="Catering"
                  width={500}
                  height={500}
                  src={`${imageUrl}${data?.image}`}
                  className="h-full w-full"
                  //   fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
          </div>
        ) : (
          <NoContent
            title="No Story Found"
            desc="Please add description from admin dashboard"
          />
        )}
      </div>

      {/* contact option */}
      <Amenities />
    </div>
  );
};

export default AboutClient;
