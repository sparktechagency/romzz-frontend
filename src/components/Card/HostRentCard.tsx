"use client";
import Image from 'next/image';
import React from 'react';
import property from "@/assets/property.png";
import Heading from '../shared/Heading';
import Person from "@/assets/person.png";
import { TfiLocationPin } from 'react-icons/tfi';

interface IHostRentCardProps{
    open: boolean;
    setOpen: (open:boolean)=> void;
}

const HostRentCard:React.FC<IHostRentCardProps> = ({setOpen}) => {
    return (
        <div className='flex gap-6'>

            <div className='w-[344px] h-[226px] relative'>
                <Image
                    alt='Property'
                    src={property}
                    fill
                />
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-primary font-semibold text-[24px] leading-5 mb-2'>$100<sub className='font-normal'>/pw</sub></h1>
                    <button className='w-[40px] h-6 bg-[#FAFAFA] text-[#767676] rounded-3xl font-bold text-[12px] leading-4'>Edit</button>
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

                <p className='text-secondary text-sm my-2 leading-[21px] font-normal'>Post Date : 2/7/2024</p>
                <p className='text-secondary text-right text-sm my-2 leading-[21px] font-normal'>Waiting </p>
            </div>

        </div>
    )
}

export default HostRentCard