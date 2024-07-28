import React from "react";
import hostbanner from "@/assets/hostBanner.png";
import person from "@/assets/person2.png";
import Image from "next/image";
import Heading from "@/components/shared/Heading";
import { Rate } from "antd";
import Sidebar from "@/components/Profile/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      {/* heading  */}
      <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] py-6">
        My <span className="text-primary">Profile</span>
      </Heading>

      <div className="relative lg:h-[200px] h-[250px]">
        <Image src={hostbanner} alt="host-profile" fill />
        <div className="lg:w-[430px] w-[80%] absolute left-0 top-1/2 transform -translate-y-1/2 border-2 p-1 rounded-r-[90px] bg-[#E6F2F5] bg-opacity-[80%]">
          <div className="flex items-center gap-6">
            <Image
              src={person}
              alt="host-profile"
              width={120}
              height={120}
              className="border-2 rounded-full p-1 border-primary"
            />
            <div>
              <Heading
                name="Aladin"
                style="font-semibold text-[24px] leading-[36px] text-[#333333]"
              />

              <Rate style={{ color: "#FF9773" }} defaultValue={5} />
              <p className="text-[#767676] text-[14px]  leading-6 font-normal">
                R no 1 , Block B, CITY X, USA
              </p>
              <p className="text-[#767676] text-[14px]  leading-6 font-normal">
                @gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 grid-cols-1 bg-primary border">
        {/* sidebar */}
        <div className="col-span-2 bg-[#3399B1] h-fit pt-6">
          <Sidebar />
        </div>

        {/* main content */}
        <div className="col-span-10 bg-[#F7F7F7] lg:p-6 p-3">{children}</div>
      </div>
    </div>
  );
};

export default layout;
