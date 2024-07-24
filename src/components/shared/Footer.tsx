"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from "@/assets/Logo.png";
import Heading from './Heading';
import { Button, Input } from 'antd';

const Footer = () => {
    const [keyword, setKeyword] = useState("");

    const item = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Services",
            path: "/services"
        },
        {
            label: "About",
            path: "/about"
        }
    ]

    const items = [
        {
            label: "News",
            path: "/news"
        },
        {
            label: "Terms & Conditions",
            path: "/term-and-conditions"
        },
        {
            label: "Supports",
            path: "/supports"
        }
    ]
    return (
        <div 
            className='bg-[#F9F9F9] mt-6 md:mt-16'
            
        >
            <div className='container grid grid-cols-12 py-[30px] gap-8 md:gap-0'>
                 <Link href={"/"} className='col-span-12 mb-4'>
                    <Image alt='Logo' src={Logo} width={188} height={150} />
                </Link>
                <div className='col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4 mx-auto sm:mx-0'>
                    <p className='text-base'>
                        Fusce quis tellus nulla. Donec sodales mauris eget pellentesque hendrerit. Donec molestie 
                        non urna sit amet aliquet. Curabitur sit amet est nec nulla varius fermentum. explore us
                    </p>
                </div>

                <div className='col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-2 flex flex-col gap-4'>
                    {
                        item.map((menu, index) => {
                            return(
                                <Link 
                                    key={index} 
                                    className={`
                                        h-[21px]
                                        font-normal text-[16px] leading-6 
                                        text-[#555656] 
                                        border-[#D9D9D9]
                                    `} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className='col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-2 flex flex-col gap-4'>
                    {
                        items.map((menu, index) => {
                            return(
                                <Link 
                                    key={index} 
                                    className={`
                                        h-[21px]
                                        font-normal text-[16px] leading-6 
                                        text-[#555656] 
                                        border-[#D9D9D9]
                                    `} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className='col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4'>
                    <Heading name='Get in touch !' style='font-semibold text-[16px] leading-[20px] text-[#575757] mb-2' />
                    <div className='w-full flex md:items-center flex-col md:flex-row gap-4'>
                        <Input
                            placeholder='Enter Your Email'
                            style={{
                                width: "100%",
                                height: 40,
                                border: "1px solid #BBBBBB",
                                boxShadow: "none",
                                outline: "none",
                                color: "#5C5C5C",
                                background:"#FFFFFF"
                            }}
                            value={keyword}
                            onChange={(e)=>setKeyword(e.target.value)}
                            className='placeholder:text-[#5C5C5C]'
                        />

                        <Button 
                            onClick={()=>setKeyword("")}
                            htmlType='submit'
                            style={{
                                background: "#00809E",
                                color: "white",
                                border: "none",
                                height: 42
                            }}
                        >
                            Subscribe
                        </Button>

                    </div>
                </div>
            </div>

            <div className='bg-[#003642] py-3'>
                <p className='text-center text-[#ffffff]'>© Copyright UX/UI 2204 Team Md. Asadujjaman Mahfuz</p>
            </div>
        </div>
    )
}

export default Footer