"use client";
import React, { useState } from 'react';
import Modal from './shared/Modal';
import { Form, Input, Select } from 'antd';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { TiArrowSortedDown } from 'react-icons/ti';
interface IFilterProps{
    open: boolean;
    setOpen: (open: boolean)=>void;
}


const Filter:React.FC<IFilterProps> = ({open, setOpen}) => {
    const [tab, setTab] = useState("Room mate");
    const body =(
        <div>
            <Form layout='vertical'>
                <div className="mt-8 border-b-[1px] border-[#C0C0C0] pb-4">
                    <ul className="flex flex-wrap items-center gap-6">
                        {
                            ["Room mate", "Flat mate", "Whole Unit", "House"].map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`
                                            font-normal w-fit  h-10 text-center 
                                            px-5
                                            flex items-center justify-center 
                                            text-[16px] leading-6
                                            ${
                                            item === tab
                                                ? "bg-white text-[#00809E] border border-primary transition-all duration-200"
                                                : "bg-[#F3F3F3] text-[#767676] border border-transparent"
                                            }
                                            rounded-3xl cursor-pointer
                                        `}
                                        onClick={() => setTab(item)}
                                    >
                                        {item}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className='mt-4 flex items-center gap-6'>
                    <Form.Item
                        name={"location"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Location</p>}
                        className='flex-1'
                    >
                        <Input
                            suffix={
                                <div className='w-10 cursor-pointer h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <FaMapLocationDot size={24} color='#00809E' />
                                </div>
                            }
                            prefix={<IoLocationOutline size={24} color='#5C5C5C' />}
                            style={{
                                width: "100%",
                                background: "#FEFEFE",
                                border: "1px solid #E0E0E0",
                                borderRadius: 24,
                                outline: "none",
                                boxShadow: "none",
                                padding: "4px 4px 4px 11px"
                            }}
                            placeholder='Search your destination'
                            className='flex-1 placeholder:text-[#767676] placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[14px]'
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name={"property-type"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Property Type</p>}
                        className='w-[300px]'
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Property Area</p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
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
                    </Form.Item>
                </div>

            </Form>


        </div>
    )
    return (
        <Modal
            title='Filter Property'
            open={open}
            setOpen={setOpen}
            body={body}
            width={754}
        />
    )
}

export default Filter