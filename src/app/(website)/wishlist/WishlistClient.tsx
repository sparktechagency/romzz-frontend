"use client"
import Heading from '@/components/shared/Heading'
import Image from 'next/image';
import React from 'react';
import Property from "@/assets/property.png";
import Person from "@/assets/person.png";
import { TfiLocationPin } from "react-icons/tfi";
import { Heart } from 'lucide-react';
import Link from 'next/link';


const WishlistClient = () => {
    return (
        <div className='container pt-6'>

            {/* heading  */}
            <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] mb-6">
                <span className="text-primary">Favorite</span> Deals
            </Heading>

            {/* wishlist container */}

            <div className='grid grid-cols-4 gap-6'>
                {
                    [...Array(8)].map((item, index)=>{
                        return(
                            <Link key={index} href={`/details/${index + 1}`}>
                                <div 
                                    
                                    className='max-w-[360px] group p-2 rounded-lg'
                                    style={{
                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                                    }}
                                >
                                    <div className='mb-4 overflow-hidden'>
                                        <Image
                                            alt='Logo' src={Property} style={{objectFit: "contain"}}
                                            className='group-hover:scale-105 transition-all duration-300'
                                        />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <h1 className='text-primary font-semibold text-[24px] leading-5'>$100<sub className='font-normal'>/pw</sub></h1>
                                        <Heart size={24} color='red' fill='red' />
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
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default WishlistClient