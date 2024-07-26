import React, { useState } from 'react'
import Modal from './shared/Modal';
import hostbanner from "@/assets/hostBanner.png";
import person from "@/assets/person2.png";
import Image from 'next/image';
import { Rate } from 'antd';
import Heading from './shared/Heading';
import { Eye } from 'lucide-react';
import ClientProfile from './ClientProfile';

interface IHostProfileProps{
    id: string;
    open: boolean;
    setOpen: (open:boolean)=> void;
}
const HostProfile:React.FC<IHostProfileProps> = ({id, open, setOpen}) => {
    const [openModal, setOpenModal] = useState(false);

    const body= (
        <div className=''>

            {/* banner image and profile image section */}
            <div className='relative h-[200px]'>
                <Image
                    src={hostbanner}
                    alt='host-profile'
                    fill
                />
                <div className='absolute left-4 -bottom-12 border-2 p-1 rounded-full border-primary'>
                    <Image
                        src={person}
                        alt='host-profile'
                        width={120}
                        height={120}
                    />
                </div>
            </div>

            {/* profile details section */}
            <div className='grid grid-cols-12 gap-6 mt-5'>

                <div className="col-span-6 mt-16">
                    <div className="flex items-center justify-between">
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[60%]'>User Name</span>
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[10%]'>:</span>
                        <span className='font-medium text-[16px] leading-6 text-[#818181] w-full'>Salman Sha</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[60%]'>Address</span>
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[10%]'>:</span>
                        <span className='font-medium text-[16px] leading-6 text-[#818181] w-full'>R no 1 , Block B, CITY X, USA</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[60%]'>Rating</span>
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[10%]'>:</span>
                        <span className='font-medium text-[16px] leading-6 text-[#818181] w-full'>< Rate defaultValue={3.5} allowHalf/> </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[60%]'>Performance</span>
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[10%]'>:</span>
                        <span className='font-medium text-[16px] leading-6 text-[#818181] w-full'>Good</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[60%]'>Total rent</span>
                        <span className='font-medium text-[16px] leading-6 text-[#636363] w-[10%]'>:</span>
                        <span className='font-medium text-[16px] leading-6 text-[#818181] w-full'>14</span>
                    </div>
                </div>

                <div className='bg-[#EBEBEB] p-6 rounded-3xl col-span-6'>
                    <div className='grid grid-cols-1 gap-4'>
                        {
                            [...Array(3)].map((item, index)=>{
                                return(
                                    <div key={index} className='flex gap-3 bg-[#F7F7F7] rounded-3xl p-4'>
                                        <Image
                                            src={person}
                                            alt='host-profile'
                                            width={90}
                                            height={90}
                                            style={{objectFit: "contain"}}
                                        />
                                        <div className=' w-full'>
                                            <div className='w-full flex items-center justify-between'>
                                                <Heading name="Aladin" style="font-normal text-[18px]  leading-[20px] text-[#333333]"/>
                                                <Eye onClick={()=>setOpenModal(true)} size={24} color='#767676' className='cursor-pointer' />
                                            </div>
                                            < Rate defaultValue={3.5} allowHalf/> 
                                            <p className='text-[#767676] text-[15px] leading-5 font-normal'>
                                                
                                                Literally I didn&apos;t expect but the facilities and the neighbourhood...
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>



        </div>
    )

    return (
        <div>
            <Modal
                title='Host Details'
                open={open}
                setOpen={setOpen}
                body={body}
                width={1000}
            />
            <ClientProfile
                open={openModal}
                setOpen={setOpenModal}
            />
        </div>
    )
}

export default HostProfile