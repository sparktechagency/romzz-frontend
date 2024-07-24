import Heading from '@/components/shared/Heading'
import Image from 'next/image'
import React from 'react';
import banner from "@/assets/about.png"
import { LuPhoneCall } from 'react-icons/lu';
import { Mailbox, ShieldCheck } from 'lucide-react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { RiRefund2Line } from "react-icons/ri";


const AboutClient = () => {
    return (
        <div className=' pt-10'>
            <div className='container'>
                {/* heading  */}
                <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] mb-6">
                    Our {" "}
                    <span className="text-primary">Story</span>
                </Heading>


                <div className='grid grid-cols-12 gap-6'>
                    <div className='col-span-12 lg:col-span-6 order-2 lg:order-1'>
                        <p className='text-[#5C5C5C] font-normal text-[14px] leading-5'>scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat. eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet non felis, faucibus Praesent id id diam elementum Donec ex venenatis id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin. hendrerit fringilla lacus dui. consectetur venenatis placerat. placerat lacus, at viverra </p>
                        <br />
                        <p className='text-[#5C5C5C] font-normal text-[14px] leading-5'>scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat. eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet non felis, faucibus Praesent id id diam elementum Donec ex venenatis id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin. hendrerit fringilla lacus dui. consectetur venenatis placerat. placerat lacus, at viverra </p>
                    </div>

                    <div className="col-span-12 lg:col-span-6 h-full lg:h-[481px] relative order-1 lg:order-2">
                            <Image
                                alt="Catering"
                                src={banner}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                </div>
            </div>

            {/* contact option */}
            <div className='bg-[#F3F3F3] py-16 mt-16'>
                <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] text-center">
                    Why use {" "}
                    <span className="text-primary">Romzz</span>
                </Heading>
                <div className='container  grid grid-cols-3 gap-6 mt-20'>

                    <div className='relative bg-white w-[319px] h-[369px] px-6 pb-6 rounded-2xl mx-auto '>

                        {/* float icon */}
                        <div className='bg-[#F3F3F3] p-3 absolute left-6 -top-16 rounded-full'>
                            <div className='w-fit h-fit rounded-full bg-white p-2'>
                                <div className='w-20 h-20 flex items-center justify-center rounded-full bg-[#F3F3F3] p-2'>
                                    <ShieldCheck 
                                        size={45} 
                                        color='#00B047'
                                        className=''
                                    />
                                </div>
                            </div>
                        </div>

                        {/* info container */}
                        <div className='mt-20'>
                            <Heading name="Verified Properties" style="font-medium text-[24px] leading-[29px] text-[#5C5C5C] mb-4"/>
                            <p className='text-[#7676761] text-[14px] leading-[21px] font-normal'>
                                quis id tincidunt viverra felis, elit. Praesent malesuada eget nibh Nunc ullamcorper eget vehicula, 
                                enim. Quisque non sollicitudin. viverra tortor. urna eget 
                            </p>
                            <p className='underline text-primary  text-[14px] leading-[21px] font-normal'>See More</p>
                        </div>
                    </div>

                    <div className='relative bg-white w-[319px] h-[369px] rounded-2xl mx-auto px-6 pb-6'>

                        {/* float icon */}
                        <div className='bg-[#F3F3F3] p-3 absolute left-6 -top-16 rounded-full'>
                            <div className='w-fit h-fit rounded-full bg-white p-2'>
                                <div className='w-20 h-20 flex items-center justify-center rounded-full bg-[#F3F3F3] p-2'>
                                    <Mailbox 
                                        size={45} 
                                        color='white'
                                        className=''
                                    />
                                </div>
                            </div>
                        </div>

                        {/* info container */}
                        <div className='mt-20'>
                            <Heading name="24/7 Consultation" style="font-medium text-[24px] leading-[29px] text-[#5C5C5C] mb-4"/>
                            <p className='text-[#7676761] text-[14px] leading-[21px] font-normal'>
                                quis id tincidunt viverra felis, elit. Praesent malesuada eget nibh Nunc ullamcorper eget vehicula, 
                                enim. Quisque non sollicitudin. viverra tortor. urna eget 
                            </p>
                            <p className='underline text-primary  text-[14px] leading-[21px] font-normal'>See More</p>
                        </div>
                    </div>

                    <div className='relative bg-white w-[319px] h-[369px] rounded-2xl mx-auto px-6 pb-6'>

                        {/* float icon */}
                        <div className='bg-[#F3F3F3] p-3 absolute left-6 -top-16 rounded-full'>
                            <div className='w-fit h-fit rounded-full bg-white p-2'>
                                <div className='w-20 h-20 flex items-center justify-center rounded-full bg-[#F3F3F3] p-2'>
                                    <RiRefund2Line 
                                        size={45} 
                                        color='#007490'
                                        className=''
                                    />
                                </div>
                            </div>
                        </div>

                        {/* info container */}
                        <div className='mt-20'>
                            <Heading name="Refund Policy" style="font-medium text-[24px] leading-[29px] text-[#5C5C5C] mb-4"/>
                            <p className='text-[#7676761] text-[14px] leading-[21px] font-normal'>
                                quis id tincidunt viverra felis, elit. Praesent malesuada eget nibh Nunc ullamcorper eget vehicula, 
                                enim. Quisque non sollicitudin. viverra tortor. urna eget 
                            </p>
                            <p className='underline text-primary  text-[14px] leading-[21px] font-normal'>See More</p>
                        </div>
                    </div>


                    
                </div>
            </div>
        </div>
    )
}

export default AboutClient