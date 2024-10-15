import Faq from "@/components/Faq";
import Heading from "@/components/shared/Heading";
import { Mailbox } from "lucide-react";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";

const SupportsClient = () => {
  return (
    <div className="bg-[#E6F2F5] pt-20">
      {/* heading  */}
      <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] text-center mb-10">
        We Are Here
        <span className="text-primary">To Help You</span>
      </Heading>

      {/* contact option */}
      <div className="container  grid lg:grid-cols-3 grid-cols-1 gap-6 pb-20">
        <div className="relative bg-white group w-[319px] h-[220px] rounded-2xl mx-auto flex items-center justify-center">
          {/* float icon */}
          <div className="bg-[#E6F2F5]  p-3 absolute -left-16 top-8 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary p-2">
                <FaMapLocationDot
                  size={45}
                  color="white"
                  className="group-hover:scale-110 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* info container */}
          <div>
            <Heading
              name="Location"
              style="font-medium text-[24px] leading-[29px] text-primary"
            />
            <p className="text-[#7676761] text-[14px] leading-[21px] font-normal">
              Al. Brucknera Aleksandra 63, <br /> Wrocław 51-410
            </p>
          </div>
        </div>

        <div className="relative bg-white w-[319px] group h-[220px] rounded-2xl mx-auto flex items-center justify-center">
          {/* float icon */}
          <div className="bg-[#E6F2F5] p-3 absolute -left-16 top-8 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-secondary p-2">
                <Mailbox
                  size={45}
                  color="white"
                  className="group-hover:scale-110 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* info container */}
          <div>
            <Heading
              name="Email"
              style="font-medium text-[24px] leading-[29px] text-primary"
            />
            <p className="text-[#7676761] text-[14px] leading-[21px] font-normal">
              romzzinfo@gmail.com
            </p>
          </div>
        </div>

        <div className="relative group bg-white w-[319px] h-[220px] rounded-2xl mx-auto flex items-center justify-center">
          {/* float icon */}
          <div className="bg-[#E6F2F5] p-3 absolute -left-16 top-8 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="w-20  h-20 flex items-center justify-center rounded-full bg-[#00B047] p-2">
                <LuPhoneCall
                  size={45}
                  color="white"
                  className="group-hover:scale-110 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* info container */}
          <div>
            <Heading
              name="Get In Touch!"
              style="font-medium text-[24px] leading-[29px] text-primary"
            />
            <p className="text-[#7676761] text-[14px] leading-[21px] font-normal">
              +35 5231445
            </p>
          </div>
        </div>
      </div>

      {/* faq section */}
      <div className="bg-white pt-20">
        <Faq />
      </div>
    </div>
  );
};

export default SupportsClient;
