import React from 'react';
import list from "@/assets/homepage-desktop-bed-hover.webp"
import host from "@/assets/homepage-desktop-woman.webp"
import Image from 'next/image';
import Link from 'next/link';

const Feature = () => {
    return (
        <div className='container my-6'>
            <div className='flex items-center justify-center gap-10'>
                    <Link href={"/profile/rental-details"}>
                        <div 
                            className='rounded-lg flex justify-between items-center p-3 w-[450px]'
                            style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}
                        >
                            <div>
                                <p className='font-semibold text-[18px]'>
                                    Create A free <br /> 
                                    property listing
                                </p>
                                <button className='bg-primary text-white h-10 rounded-md px-3 mt-3'>I need flatmate</button>
                            </div>
                            <Image alt="s" src={list} width={250} height={200}  />
                        </div>
                    </Link>
                <Link href={"/services"}>
                    <div 
                        className='rounded-lg flex justify-between items-center p-3 w-[450px]'
                        style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}
                    >
                        <div>
                            <p className='font-semibold text-[18px]'>
                                Create A free <br /> 
                                seeker listing
                            </p>
                            <button className='bg-primary text-white h-10 rounded-md px-3 mt-3'>I need place</button>
                        </div>
                        <Image alt="s" src={host} width={250} height={200}  />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Feature