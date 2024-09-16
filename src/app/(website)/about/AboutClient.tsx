"use client";
import Heading from "@/components/shared/Heading";
import Image from "next/image";
import React from "react";
import banner from "@/assets/about.png";
import { LuPhoneCall } from "react-icons/lu";
import { Mailbox, ShieldCheck } from "lucide-react";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiRefund2Line } from "react-icons/ri";
import Amenities from "@/components/Amenities";
import { useGetOurStoryQuery } from "@/redux/features/web/api/ourStoryApi";
import { imageUrl } from "@/redux/api/api";
import NoContent from "@/components/shared/NoContent";

const AboutClient = () => {
  const { data } = useGetOurStoryQuery({});
  return (
    <div className=" pt-10">
      <div className="container">
        {/* heading  */}
        <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] mb-6">
          Our <span className="text-primary">Story</span>
        </Heading>

        {data ? (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div className=" ">
              <p className="text-[#5C5C5C] font-normal text-[14px] leading-5">
                {data?.title}
              </p>
              <br />
              <p className="text-[#5C5C5C] font-normal text-[14px] leading-5">
                {data?.storyDetails}
              </p>
            </div>

            <div className=" h-[455px] w-[607px] ">
              <Image
                alt="Catering"
                width={500}
                height={500}
                src={`${imageUrl}${data?.image ? data.image : banner}`}
                className="h-full w-full"
                //   fill
                style={{ objectFit: "cover" }}
              />
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
