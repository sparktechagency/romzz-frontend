"use client";
import Image from 'next/image';
import React from 'react';
import property from "@/assets/property.png";
import Heading from '../shared/Heading';
import Person from "@/assets/person.png";
import { TfiLocationPin } from 'react-icons/tfi';

interface IRentalCardProps{
    open: boolean;
    setOpen: (open:boolean)=> void;
}

const RentalCard:React.FC<IRentalCardProps>  = ({setOpen}) => {
    return (
        <div className='flex gap-6'>

            <div className='w-[344px] h-[226px] relative'>
                <Image
                    alt='Property'
                    src={property}
                    fill
                />
            </div>

            <div className=''>
                <h1 className='text-primary font-semibold text-[24px] leading-5'>$100<sub className='font-normal'>/pw</sub></h1>
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
                <button onClick={()=>setOpen(true)} className='bg-secondary w-[91px] h-8 rounded-3xl text-[#FAFAFA] text-[14px] leading-6 font-bold'>Feedback</button>
            </div>

        </div>
    )
}

export default RentalCard