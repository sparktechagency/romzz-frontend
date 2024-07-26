"use client";
import Heading from '@/components/shared/Heading'
import { ChevronDown, MoveLeft, Wifi } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react';
import property from "@/assets/property2.png";
import person from "@/assets/person.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import ReactMapGL, { Marker } from "react-map-gl";
import marker from "@/assets/marker.png";
import 'mapbox-gl/dist/mapbox-gl.css';
import { TfiLocationPin } from 'react-icons/tfi';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import "slick-carousel/slick/slick.css";
import Calender from '@/components/Calender';
import HostProfile from '@/components/HostProfile';

const DetailsClient = ({id}: {id: string}) => {
    const [sliderIndex, setSliderIndex] = useState<number>();
    const [open, setOpen] = useState(false)
    const [viewport, setViewport] = useState({
        latitude: 23.810331,
        longitude: 90.412521,
        zoom: 15
    });

    const ArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
        <button
            {...props}
            className="prev absolute z-[1] top-[40%] -left-2"
        >
            <BiChevronLeft size={24} color='black' className='mx-auto ' />
        </button>
    );
    
    const ArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
        <button
            {...props}
            className="next absolute top-[40%] -right-2"
        >
            <BiChevronRight size={24} color='black' className='mx-auto' />
        </button>
    );

    const settings: Settings = {
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: false,
        dots: false,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        autoplaySpeed: 2000
    };

    return (
        <div className='container pt-6'>
            <Link href={"/"} >
                <div className='w-[91px] h-[31px] rounded-[90px] flex  items-center justify-center gap-1 bg-[#F7F7F7] text-base'>
                    <MoveLeft size={18} color='#5C5C5C' />
                    Back
                </div>
            </Link>

            <Heading name="Looking for a room in Sydney" style="font-bold text-[32px]  leading-[48px] text-[#333333]"/>
            <p className='text-secondary text-[14px] leading-5 font-normal'>Post Date : 2/7/2024</p>

            <div className='mt-1 grid grid-cols-12 gap-6'>
                <div className='col-span-12 lg:col-span-7 order-2 lg:order-1 bg-[#F3F3F3] p-2 rounded-lg'>
                    <div className='h-[406px] w-full relative mb-3'>
                        <Image
                            alt='property'
                            fill
                            style={{ borderRadius: 8}}
                            src={property}
                        />
                    </div>

                    <div className=' relative'>
                        <Slider {...settings}>
                            {
                                [...Array(6)].map((item, index)=>{
                                    return(
                                        <div 
                                            className='w-[123px] h-[98px] relative group'
                                            key={index}
                                            onClick={()=>setSliderIndex(index)}
                                        >
                                            <Image
                                                alt='Logo' 
                                                src={property}
                                                fill 
                                                style={{borderRadius: 8}}
                                                className={`${index === sliderIndex ? "border border-[#00809E] border-opacity-[50%]" : "border border-transparent"}`}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                </div>

                <div className="col-span-12 lg:col-span-5 relative order-1 lg:order-2 bg-[#F3F3F3] p-2 rounded-lg">

                    {/* host info */}
                    
                    <div className='flex items-center justify-between border border-[#E0E0E0] bg-white rounded-3xl p-2 mb-2'>
                        <div className='flex items-center gap-2 '>
                            <Image
                                alt='property'
                                width={40}
                                height={40}
                                style={{borderRadius: "100%"}}
                                src={person}
                            />
                            <p className='text-[#767676] text-[18px] leading-7 font-medium'>Jackman</p>
                        </div>
                        <div onClick={()=>setOpen(true)} className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                            <MdOutlineArrowOutward size={24} color='#00809E' />
                        </div>
                    </div>

                    <div className='bg-white p-2 rounded-lg mb-2'>
                        <div className='h-[200px] w-full'>
                            <ReactMapGL
                                {...viewport}
                                style={{width: "100%", height: "100%", borderRadius: 8}}
                                mapboxAccessToken="pk.eyJ1Ijoib2huYWRpciIsImEiOiJjbGYzbXB2cG4wcjNsM3FuZGkyeXgzaGp3In0.UW7J5lIaWc-P3nXa2WmRxQ"
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                            >
                                <Marker
                                    latitude={viewport.latitude}
                                    longitude={viewport.longitude}
                                >
                                    <Image
                                        src={marker}
                                        alt='marker'
                                        width={30}
                                        height={30}
                                    />
                                </Marker>   
                            </ReactMapGL>
                        </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <TfiLocationPin size={22} color='#5C5C5C'/>
                            <p className='text-base text-sm  leading-[21px] font-normal'>55/A , b park road , Abcd area, city</p>
                        </div>
                    </div>

                    <div className='w-full h-[56px]  flex items-center justify-between border border-[#E0E0E0] bg-white rounded-3xl px-5 mb-2'>
                        <p className='text-base text-[16px] leading-5 font-medium'>Category:</p>
                        <p className='text-[#333333] text-[16px] leading-5 font-medium'>Whole-unit</p>
                    </div>
                    
                    <div className='w-full h-[56px] flex items-center justify-between border border-[#E0E0E0] bg-white rounded-3xl px-5 mb-2'>
                        <p className='text-base text-[16px] leading-5 font-medium'>Price :</p>
                        <p className='text-[#333333] text-[16px] leading-5 font-medium'>
                            <h1 className='text-primary font-semibold text-[24px] leading-5'>$100<sub className='font-normal'>/pw</sub></h1>
                        </p>
                    </div>

                    <button className='w-full h-[56px] text-center text-white bg-primary rounded-3xl px-5 mb-2'>
                        Book Now
                    </button>
                </div>
            </div>

            {/*  */}
            <div className='rounded-lg bg-[#F3F3F3] p-6 mt-6 '>

                <div className='grid grid-cols-12 gap-6'>
                    <div className='col-span-12 lg:col-span-8 order-2 lg:order-1'>
                        <Heading name="About" style="font-normal text-[24px] mb-4 leading-[36px] text-[#333333]"/>
                        <p className='text-[#767676] text-[16px] leading-6 font-normal'>
                            amet, ex Ut adipiscing sodales. massa placerat. Sed eget fringilla gravida nisi Donec eu eu tempor nulla, nulla, 
                            leo. faucibus tortor. Donec libero, elementum  tincidunt id tincidunt dui faucibus turpis consectetur amet, nibh luctus 
                            nibh lacus, ex hendrerit fringilla fringilla est. lacus Nunc tincidunt dignissim, id nec Lorem dui Sed nibh id elementum non tincidunt 
                        </p>

                        
                        <div className="flex flex-wrap text-base mt-6">
                            <div className="w-1/2">
                                <div className="flex items-center justify-between">
                                    <span className='w-full'>Size</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>1400/sf</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Decorated</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>Furnished</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Property type</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>Apartment</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Bed type</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>Single bed</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Bedrooms</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>3</span>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <div className="flex items-center justify-between">
                                    <span className='w-full'>Bathrooms</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>3</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Balcony</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>2</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Kitchen</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>1</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Dining</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>1</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className='w-full'>Drawing</span>
                                    <span className='w-full'>:</span>
                                    <span className='w-full'>1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4 order-1 lg:order-2">
                        <Calender/>
                    </div>
                </div>

                <div className='col-span-12 mt-6 flex items-center gap-10'>
                    <p className='text-[#5C5C5C] leading-6 font-medium text-[16px]'>Move on : {" "} <span className='text-[#00B047]'>Instant</span>  </p>
                    <p className='text-[#5C5C5C] leading-6 font-medium text-[16px]'>Gender : {" "} <span className='text-[#00B047]'>Male/Female</span>  </p>
                    <p className='text-[#5C5C5C] leading-6 font-medium text-[16px]'>Guest type : {" "}<span className='text-[#00B047]'>Single/Couple/Family</span>  </p>
                    <p className='text-[#5C5C5C] leading-6 font-medium text-[16px]'>Occupation : {" "} <span className='text-[#00B047]'>All</span>  </p>
                </div>

                {/* facilities */}
                <div className='mt-6'>
                    <Heading name="Facilities" style="font-normal text-[24px] mb-4 leading-[36px] text-[#333333]"/>
                    <div className='flex items-center gap-4'>
                        {
                            [...Array(5)].map((item, index)=>{
                                return(
                                    <div key={index} className='bg-[#FFDFD4] gap-2 text-[#333333] rounded-3xl w-fit px-3 h-[40px] flex items-center justify-center'>
                                        <Wifi size={24} color='#333333' />
                                        {"Wifi"}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <HostProfile open={open} setOpen={setOpen} id="asdasd" />

        </div>
    )
}

export default DetailsClient