"use client";
import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Select } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TiArrowSortedDown } from "react-icons/ti";

const Sidebar = () => {
    const path = usePathname();
    const pathName = path?.split("/")[2];

    const item = [
        {
            label: "Profile",
            path: "profile-details"
        },
        {
            label: "Booking History",
            path: "booking-history"
        },
        {
            label: "Subscription",
            path: "subscription"
        },
        {
            label: "Rental Details",
            path: "rental-details"
        }
    ]
    return (
        <div id='language-change'>
            {
                item?.map((route:any, index: number)=>{
                    return(
                        <Link key={index} href={`/profile/${route.path}`} className=''>
                            <li 
                                className={`
                                    text-[16px] leading-6 
                                    font-normal text-[#F7F7F7] 
                                    list-none h-[44px] pl-6
                                    ${route.path === pathName ? "bg-[#007490]" : "bg-transparent"}
                                    ${ `${route.path}` === "profile-details" && path === "/profile" ? "bg-[#007490]" : null}
                                    hover:bg-[#007490] transition-all duration-150
                                    flex items-center
                                `}
                            >
                                {route.label}
                            </li>
                        </Link>
                    )
                })
            }
            <li 
                className={`
                    text-[16px] leading-6 
                    font-normal text-[#F7F7F7] 
                    list-none h-[44px] pl-6
                    hover:bg-[#007490] transition-all duration-150
                    flex items-center
                `}
            >
                <Select
                    placeholder={<p className='text-[#F7F7F7] text-[16px] font-normal leading-6'>English</p>}
                    style={{
                        width: "100%",
                        marginRight: 24,
                        background: "transparent"
                    }}
                    className=''
                    suffixIcon={<TiArrowSortedDown size={24} color='#F7F7F7' />}
                >
                    <Select.Option value="male">English</Select.Option>
                    <Select.Option value="female">Spanish</Select.Option>
                </Select>
            </li>
            <li 
                className={`
                    text-[16px] leading-6 
                    font-normal text-[#F7F7F7] 
                    list-none h-[44px] pl-6
                    hover:bg-[#007490] transition-all duration-150
                    flex items-center
                `}
            >
                Logout
            </li>
        </div>
    )
}

export default Sidebar