"use client"
import Heading from '@/components/shared/Heading'
import React, { useState } from 'react';
import photo from "../../../assets/news.png"
import Image from 'next/image';
import { Pagination } from 'antd';

const NewsClient = () => {
    const [page, setPage] = useState(1)
    return (
        <div className='container py-10'>

            {/* heading  */}
            <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] mb-6">
                <span className="text-primary">Romzz</span> {" "}
                News
            </Heading>

            {/* news container */}

            <div className='grid grid-cols-2 gap-6'>
                {
                    [...Array(6)].map((news, index)=>{
                        return(
                            <div
                                key={index}
                                className='flex relative bg-red-200 items-end group overflow-hidden cursor-pointer'
                            >
                                <Image
                                    alt='PHOTO'
                                    src={photo}
                                    width={1300}
                                    height={300}
                                />
                                <div className='absolute w-full left-0  p-4'>
                                    <div className='translate-y-[86px]  transition-all duration-500 group-hover:translate-y-0'>
                                        <Heading name="Rental Problem of Australia" style="font-semibold text-[24px] leading-[32px] mb-6 text-[#FAFAFA]"/>
                                        <p className='text-[#FAFAFA]'>
                                            Quis urna. tempor consectetur risus q 
                                            <br /> 
                                            Quis urna. tempor consectetur risus q
                                        </p>
                                        <div className='text-[#FAFAFA] flex items-center gap-2 underline'>
                                            <p>Visit Now</p>
                                        </div>
                                    </div>
                                </div>
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

export default NewsClient