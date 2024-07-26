"use client";
import ChangePassword from '@/components/Profile/ChangePassword';
import UserDetails from '@/components/Profile/UserDetails';
import React, { useEffect, useState } from 'react'

const ProfileDetailsClient = () => {
    const [tab, setTab] = useState("User Details");
    useEffect(()=>{
        const initialTab = new URLSearchParams(window.location.search).get("tab") || "User Details";
        setTab(initialTab);
    }, []);

    const handleTabChange=(tab: string)=>{
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    return (
        <div>

            {/* tab */}
            <ul className='w-full flex items-center gap-4 border-b-[1px] border-[#C0C0C0] mb-10'>
                {
                    ["User Details", "Change Password"].map((item, index)=>{
                        return(
                            <li 
                                key={index} 
                                onClick={()=>handleTabChange(item)} 
                                className='text-[#5C5C5C] w-fit relative cursor-pointer text-[16px] leading-6 font-normal pb-3'
                            >
                                {item}
                                {
                                    tab === item
                                    &&
                                    <div className='bg-primary w-full h-[3px] absolute left-0 rounded-t-[10px] bottom-0'/>
                                }
                            </li>
                        )
                    })
                }

            </ul>

            {/* component */}
            {tab === "User Details" && <UserDetails/>}
            {tab === "Change Password" && <ChangePassword/>}
        </div>
    )
}

export default ProfileDetailsClient;