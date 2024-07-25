"use client";
import Heading from '@/components/shared/Heading';
import { Input, Pagination, Select } from 'antd'
import { Heart, Search, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import { TfiLocationPin } from 'react-icons/tfi';
import { TiArrowSortedDown } from 'react-icons/ti';
import Property from "@/assets/property.png";
import Person from "@/assets/person.png";

const ServiceClient = () => {
    const [tab, setTab] = useState("All");
    const [page, setPage] = useState<number>(1)

    useEffect(()=>{
        const initialTab= new URLSearchParams(window.location.search).get("tab") || "All";
        const initialPage= new URLSearchParams(window.location.search).get("page") || "1";
        setPage(Number(initialPage))
        setTab(initialTab);
    }, []);

    const handleTabChange=(tab:string)=>{
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    const handlePageChange=(page:number)=>{
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page.toString());
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: "350px",
                    background:"#F3F3F3",
                    borderRadius: "0 0 50px 50px"
                }}
                className='flex flex-col items-center justify-center'
            >
                <div className='w-[874px] bg-white h-[78px] py-2 rounded-[59px] flex items-center justify-between  pr-3'>

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
                
                {/* property type section */}
                <div className='mt-8'>
                    <ul className='flex items-center gap-6'>
                        {
                            ["All", "Room mate", "Flat mate", "Whole Unit", "House"].map((item, index)=>{
                                return(
                                    <li 
                                        key={index} 
                                        className={`
                                            font-normal w-fit  h-12 text-center 
                                            ${index === 0 ? "px-10" : "px-5"}
                                            flex items-center justify-center 
                                            text-[16px] leading-5 text-base
                                            ${item === tab ? "bg-secondary " : "bg-[#ADADAD] "}
                                            rounded-3xl text-white cursor-pointer
                                        `} 
                                        onClick={()=>handleTabChange(item)}
                                    >
                                        {item}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            {/* all property section */}
            <div className='container grid grid-cols-4 gap-6 mt-10'>
                {
                    [...Array(8)].map((item, index)=>{
                        return(
                            <Link key={index} href={`/details/${index + 1}`}>
                                <div 
                                    
                                    className='max-w-[360px] group p-2 rounded-lg'
                                    style={{
                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                                    }}
                                >
                                    <div className='mb-4 overflow-hidden'>
                                        <Image
                                            alt='Logo' src={Property} style={{objectFit: "contain"}}
                                            className='group-hover:scale-105 transition-all duration-300'
                                        />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <h1 className='text-primary font-semibold text-[24px] leading-5'>$100<sub className='font-normal'>/pw</sub></h1>
                                        <Heart size={24} color='red' fill='transparent' />
                                    </div>
                                    <p className='text-secondary text-sm my-2 leading-[18px] font-medium'>Whole-unit</p>
                                    <div className='flex items-center gap-4'>
                                        <Image
                                            alt='Logo' src={Person} width={30} height={30}
                                            style={{borderRadius: "100%", objectFit: "contain"}}
                                        />
                                        <Heading name="Villa in Tetouan" style="font-bold text-[18px] leading-[27px] text-base"/>
                                    </div>
                                    <div className='flex items-center gap-2 mt-3'>
                                        <TfiLocationPin size={22} color='#5C5C5C'/>
                                        <p className='text-base text-sm  leading-[21px] font-normal'>55/A , b park road , Abcd area, city</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

            {/* pagination */}
            <div className='flex items-center justify-center mt-6'>
                <Pagination
                    current={Number(page)}
                    onChange={handlePageChange}
                    total={50}
                />
            </div>
        </div>
    )
}

export default ServiceClient