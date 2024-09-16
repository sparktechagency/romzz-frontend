"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { Calendar } from "antd";

const Calender = ({ unavailableDay }: { unavailableDay: string[] }) => {
  const datesToDisable = unavailableDay?.map((date) =>
    dayjs(date).startOf("day").toDate()
  );

  const disabledDate = (date: Dayjs): boolean => {
    // Disable dates that are in the `datesToDisable` array
    return datesToDisable?.some((d) => dayjs(date).isSame(dayjs(d), "day"));
  };

  return (
    <div>
      <Calendar
        fullscreen={false}
        /* dateCellRender={(date) => {
                    if (disabledDate(date)) {
                        return <div className="text-gray-400">{date.date()}</div>;
                    } else {
                        return <div className="text-[#333333]">{date.date()}</div>;
                    }
                }} */

        disabledDate={disabledDate}
        headerRender={({ value }: { value: any }) => {
          return (
            <div className="flex items-center justify-between py-3 px-4">
              <p className="text-[#333333] text-[16px] leading-6 font-semibold">
                {dayjs(value).format("MMMM")}
              </p>
              <p className="text-[#333333] text-[16px] leading-6 font-semibold">
                {dayjs(value).format("YYYY")}
              </p>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calender;
