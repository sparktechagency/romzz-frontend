"use client";
import Image from 'next/image';
import React from 'react';
import Details from "@/assets/newsDetails.png";
import Heading from '@/components/shared/Heading';

const NewsDetailsClient = ({id}: {id: string}) => {
    return (
        <div className='container my-10'>
            <div className='w-full h-[456px] relative'>
                <Image
                    alt='new details'
                    src={Details}
                    fill
                    // style={{objectFit: "contain"}}
                />

                <div
                    className='absolute left-0 -bottom-4 bg-white w-[450px] rounded-r-3xl py-2'
                    style={{
                        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                    }}
                >
                    <Heading name="House-sharing Concierge " style="font-normal text-[32px]    text-center leading-[48px] text-[#3E3E3E]"/>
                    <Heading name="- Your House-share Advisor " style="font-normal text-[32px] text-center   leading-[48px] text-[#3E3E3E]"/>
                </div>

            </div>

            <p className='text-[#767676] text-[16px] leading-[21px] font-normal mt-10'>
                Quis urna. tempor consectetur risus quis dui. Ut leo. malesuada gravida eget ex. 
                viverra Nunc Nunc dignissim, convallis. odio non sapien sed Praesent at sit luctus elit. leo. 
                amet, urna viverra ac turpis Nunc elit. massa ipsum elit sed id  ipsum elit. enim. laoreet efficitur. 
                eget maximus vitae nisi nisl. placerat ex ex. ex ac faucibus faucibus elit sit ex. nibh hendrerit Ut Nunc 
                Ut non, Ut nec tincidunt tincidunt turpis Quisque enim. tincidunt ultrices In nibh vitae quis 
            </p>
            <br />
            <p className='text-[#767676] text-[16px] leading-[21px] font-normal'>
                Quis urna. tempor consectetur risus quis dui. Ut leo. malesuada gravida eget ex. 
                viverra Nunc Nunc dignissim, convallis. odio non sapien sed Praesent at sit luctus elit. leo. 
                amet, urna viverra ac turpis Nunc elit. massa ipsum elit sed id  ipsum elit. enim. laoreet efficitur. 
                eget maximus vitae nisi nisl. placerat ex ex. ex ac faucibus faucibus elit sit ex. nibh hendrerit Ut Nunc 
                Ut non, Ut nec tincidunt tincidunt turpis Quisque enim. tincidunt ultrices In nibh vitae quis 
            </p><br />
            <p className='text-[#767676] text-[16px] leading-[21px] font-normal'>
                Quis urna. tempor consectetur risus quis dui. Ut leo. malesuada gravida eget ex. 
                viverra Nunc Nunc dignissim, convallis. odio non sapien sed Praesent at sit luctus elit. leo. 
                amet, urna viverra ac turpis Nunc elit. massa ipsum elit sed id  ipsum elit. enim. laoreet efficitur. 
                eget maximus vitae nisi nisl. placerat ex ex. ex ac faucibus faucibus elit sit ex. nibh hendrerit Ut Nunc 
                Ut non, Ut nec tincidunt tincidunt turpis Quisque enim. tincidunt ultrices In nibh vitae quis 
            </p>
        </div>
    )
}

export default NewsDetailsClient