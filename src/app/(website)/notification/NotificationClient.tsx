import Heading from "@/components/shared/Heading";
import React from "react";

const NotificationClient = () => {
  return (
    <div className="container pt-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <Heading
          name="Notifications"
          style="font-normal text-[32px] leading-[48px] text-primary"
        />
        <p className="underline text-secondary cursor-pointer">Read All</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[...Array(6)].map((notification, index) => {
          return (
            <div
              className={`flex items-center justify-between rounded-lg p-6  ${
                index % 2 === 0 ? "bg-[#E6F2F5]" : "bg-[#F3F3F3]"
              }`}
              key={index}
            >
              <p className="text-[#A1A1A1] text-[14px] leading-[16px] font-normal">
                Yor post accepted for verification
              </p>
              <p className="text-[#A1A1A1] text-[14px] leading-[16px] font-normal">
                03:00 PM, 20/10/2024
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationClient;
