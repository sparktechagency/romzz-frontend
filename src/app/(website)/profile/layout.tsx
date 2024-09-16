import React from "react";
import Heading from "@/components/shared/Heading";
import Sidebar from "@/components/Profile/Sidebar";
import Banner from "@/components/Profile/Banner";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      {/* heading  */}
      <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] py-6">
        My <span className="text-primary">Profile</span>
      </Heading>

      <Banner />

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
