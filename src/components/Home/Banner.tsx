"use client";
import { Input, Select } from 'antd';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { TiArrowSortedDown } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";

const Banner = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "661px",
                backgroundImage: `url('/header.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "container",
            }}
            className='flex items-center justify-center'
        >
            <div data-aos="fade-down" className=' w-[874px] bg-white h-[78px] py-2 rounded-[59px] flex items-center justify-between  pr-3'>

                <div className='w-[350px]'>
                    <Input
                        suffix={
                            <div className='w-10 cursor-pointer h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                <FaMapLocationDot size={24} color='#00809E' />
                            </div>
                        }
                        prefix={<IoLocationOutline size={24} color='#5C5C5C' />}
                        style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            boxShadow: "none"
                        }}
                        placeholder='Search your destination'
                        className='placeholder:text-[#767676] placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[14px]'
                    />
                </div>

                <div  id='banner'>
                    <Select
                        placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Property Area</p>}
                        style={{
                            width: 255,
                            height: 48,
                            borderRadius: 24
                        }}
                        
                        suffixIcon={
                            <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                <TiArrowSortedDown size={24} color='#00809E' />
                            </div>
                        }
                    >
                        <Select.Option value="Sydney">Sydney</Select.Option>
                        <Select.Option value="Melbourne">Melbourne</Select.Option>
                        <Select.Option value="Brisbane">Brisbane</Select.Option>
                        <Select.Option value="Adelaide">Adelaide</Select.Option>
                        <Select.Option value="Hobart">Hobart</Select.Option>
                        <Select.Option value="Perth">Perth</Select.Option>
                    </Select>
                </div>

                <div className='flex items-center justify-between gap-6'>
                    <div className='flex items-center gap-3 cursor-pointer'>
                        <SlidersHorizontal size={18} color='#5C5C5C' />
                        <p className='text-base text-[16px] font-normal leading-6'>Filter</p>
                    </div>
                    <div className='w-[62px] cursor-pointer h-[62px] rounded-full bg-primary flex items-center justify-center'>
                        <Search size={24} color='#F3F3F3' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner