"use client";
import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        <div >
            {
                item?.map((route:any, index: number)=>{
                    const data = `/${route.path}` === `${path}`;
                    console.log(data, `/${route.path}`)
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
        </div>
    )
}

export default Sidebar