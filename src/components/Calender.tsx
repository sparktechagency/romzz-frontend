"use client";
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Calendar } from 'antd';

const Calender = () => {
    const datesToDisable = [
        dayjs('2024-08-28').startOf('day').toDate(),
        dayjs('2024-08-29').startOf('day').toDate(),
        dayjs('2024-08-30').startOf('day').toDate(),
        dayjs('2024-08-31').startOf('day').toDate(),
        dayjs('2024-09-01').startOf('day').toDate(),
        dayjs('2024-09-02').startOf('day').toDate(),
        dayjs('2024-09-03').startOf('day').toDate(),
        dayjs('2024-09-04').startOf('day').toDate(),
    ];

    const disabledDate: (date: Dayjs) => boolean = (date) => {
        // Disable dates that are in the `datesToDisable` array
        return datesToDisable.some(d =>
            dayjs(date).isSame(dayjs(d), 'day')
        );
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
                headerRender={({ value }: {value: any}) => {
                    return (
                        <div className='flex items-center justify-between py-3 px-4'>
                            <p className='text-[#333333] text-[16px] leading-6 font-semibold'>{dayjs(value).format("MMMM")}</p>
                            <p className='text-[#333333] text-[16px] leading-6 font-semibold'>{dayjs(value).format("YYYY")}</p>
                        </div>
                    );
                }}
            />
        </div>
    )
}

export default Calender