"use client";
import HostRentCard from '@/components/Card/HostRentCard';
import Heading from '@/components/shared/Heading';
import { Pagination } from 'antd';
import React, { useState } from 'react';

const RentalDetailsClient = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    return (
        <div>

            {/* heading */}
            <div className='flex items-center justify-between'>
                <Heading name="Booking History" style="font-normal text-[24px] leading-[36px] text-[#151515]"/>
                <div className='flex items-center gap-6'>
                    <p className='text-[#FF9773] font-bold text-[16px] leading-6'>Remaining Post: 3</p>
                    <button onClick={()=>setOpen(true)} className='bg-primary rounded-3xl w-[110px] h-10 text-[14px] leading-6 font-bold text-[#FAFAFA]'>New Post</button>
                </div>
            </div>

            {/* property post */}
            <div className='grid grid-cols-1 gap-6 mt-6'>
                {
                    [...Array(3)].map((property, index)=>{
                        return(
                            <div key={index} className='bg-white p-2 rounded-lg'>
                                <HostRentCard open={ open} setOpen={setOpen} />
                            </div>
                        )
                    })
                }
            </div>

            {/* pagination */}
            <div className='flex items-center justify-center mt-6'>
                <Pagination
                    current={page}
                    total={50}
                />
            </div>

            
        </div>
    )
}

export default RentalDetailsClient