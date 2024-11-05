"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { Calendar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Calender = ({ unavailableDay }: { unavailableDay: string[] }) => {
  const [value, setValue] = useState<Dayjs>(dayjs()); // Controlled value

  const disabledDate = (date: Dayjs): boolean => {
    return unavailableDay?.some((d: any) => dayjs(date).isSame(dayjs(d), "day"));
  };

  const changeMonth = (direction: "prev" | "next") => {
    const newValue = direction === "prev" ? value.subtract(1, "month") : value.add(1, "month");
    setValue(newValue);
  };

  const changeYear = (direction: "prev" | "next") => {
    const newValue = direction === "prev" ? value.subtract(1, "year") : value.add(1, "year");
    setValue(newValue);
  };

  return (
    <div>
      <Calendar
        value={value}
        onPanelChange={setValue}
        fullscreen={false}
        disabledDate={disabledDate}
        headerRender={() => {
          return (
            <div className="flex items-center justify-between py-3 px-4">
              {/* Month Controls */}
              <div className="flex items-center space-x-4">
                <LeftOutlined
                  className="cursor-pointer"
                  onClick={() => changeMonth("prev")}
                />
                <p className="text-[#333333] text-[16px] leading-6 font-semibold">
                  {dayjs(value).format("MMMM")} {/* Only month name */}
                </p>
                <RightOutlined
                  className="cursor-pointer"
                  onClick={() => changeMonth("next")}
                />
              </div>
              {/* Year Controls */}
              <div className="flex items-center space-x-4">
                <LeftOutlined
                  className="cursor-pointer"
                  onClick={() => changeYear("prev")}
                />
                <p className="text-[#333333] text-[16px] leading-6 font-semibold">
                  {dayjs(value).format("YYYY")} {/* Only year */}
                </p>
                <RightOutlined
                  className="cursor-pointer"
                  onClick={() => changeYear("next")}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calender;
