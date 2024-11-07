"use client";
import ChangePassword from '@/components/Profile/ChangePassword';
import ManageAccount from '@/components/Profile/ManageAccount';
import UserDetails from '@/components/Profile/UserDetails';
import { useGetProfileQuery } from '@/redux/apiSlices/AuthSlices';
import { useGetProgressQuery } from '@/redux/apiSlices/ClientProfileSlices';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProfileDetailsClient = () => {
    const [tab, setTab] = useState("User Details"); 
    const {data:progress} = useGetProgressQuery(undefined)   
    const {data , refetch} = useGetProfileQuery(undefined)  
    const userProgress =  progress?.data?.progress 
    const isSubscribed = data?.data?.isSubscribed
    const isSuccess = data?.data?.hasAccess
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
 <div className=' flex justify-between items-center border-b-[1px] border-[#C0C0C0] mb-10 w-full '>
 {/* tab */} 
 <div>

 <ul className='w-full flex items-center gap-6 '>
                {
                    ["User Details", "Change Password"].map((item, index)=>{
                        return(
                            <li 
                                key={index} 
                                onClick={()=>handleTabChange(item)} 
                                className={` ${tab === item ? "text-primary" : "text-[#5C5C5C]" }  w-fit relative cursor-pointer text-[16px] leading-6 font-normal pb-3`}
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



{
    isSuccess === true && isSubscribed === true &&
        <li 
    onClick={()=>handleTabChange("Manage Account")} 
    className={` ${tab === "Manage Account" ? "text-primary" : "text-[#5C5C5C]" }  w-fit relative cursor-pointer text-[16px] leading-6 font-normal pb-3`}
 >
    Manage Account
    {
        tab === "Manage Account"
        &&
        <div className='bg-primary w-full h-[3px] absolute left-0 rounded-t-[10px] bottom-0'/>
    }
</li>  

}


                             

            </ul> 
 </div>

    <p className='text-[14px] text-[#5C5C5C] lg:flex w-1/5 text-end gap-1 '> <span className='font-normal'> Profile Completed </span> <span className='text-secondary font-medium'> ({userProgress}%) </span>  </p>        

 </div>
           

            {/* component */}
            {tab === "User Details" && <UserDetails/>}
            {tab === "Change Password" && <ChangePassword/>} 
            {tab === "Manage Account" && <ManageAccount/>} 

           
        </div>
    )
}

export default ProfileDetailsClient;