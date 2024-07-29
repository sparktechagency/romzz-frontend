"use client";
import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import marker from "@/assets/marker.png";
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MoveLeft, Search, SlidersHorizontal } from 'lucide-react';
import Heading from '@/components/shared/Heading';
import { Input, Select } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';
import { TiArrowSortedDown } from 'react-icons/ti';
import Person from "@/assets/person.png";
import { TfiLocationPin } from 'react-icons/tfi';
import 'mapbox-gl/dist/mapbox-gl.css';
import Filter from '@/components/Filter';

const SearchFilter = () => {
    const [open, setOpen] = useState(false)
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 3
    });

    const handleViewportChange = (event:any) => {
        const { viewState } = event;
        setViewport(viewState);
    };

    const properties= [
        {
            latitude: 20.593683,
            longitude: 78.962883,
        },
        {
            latitude: 19.075983,
            longitude: 72.877655,
        },
        {
            latitude: 12.976750,
            longitude: 77.575280,
        },
        {
            latitude: 23.810331,
            longitude: 90.412521,
        },
        {
            latitude: 30.550435,
            longitude: 76.930733,
        },
        {
            latitude: 33.664925,
            longitude: 74.935684,
        },
        {
            latitude: 34.320755,
            longitude: 77.79213,
        },
        {
            latitude: 33.658067,
            longitude: 73.0196,
        }
    ]

    /* const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
    }); */

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            /* setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }); */
            setViewport((prev) => ({
                ...prev,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }));
        });
    }, []);


    return (
        <div className='container h-[calc(100vh-96px)] py-6'>

            <div className='rounded-lg grid grid-cols-12 h-full border border-base border-opacity-[10%]'>


                <div className='col-span-4 bg-[#F9F9F9] p-2 flex flex-col overflow-hidden'>

                    <div className='flex items-center justify-between mb-6'>
                        <Link href={"/"} >
                            <div className='w-[91px] h-[31px] rounded-[90px] flex  items-center justify-center gap-1 bg-[#F3F3F3] text-base'>
                                <MoveLeft size={18} color='#5C5C5C' />
                                Back
                            </div>
                        </Link>
                        
                        {/* heading  */}
                        <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E]">
                            <span className="text-primary">Romzz</span> {" "}
                            Map
                        </Heading>
                    </div>

                    <div className='px-2 border-b-[1px] border-base pb-4 border-opacity-[20%]'>
                        <Input
                            suffix={
                                <div className='w-10 cursor-pointer h-10 rounded-full bg-[#00809E] flex items-center justify-center'>
                                    <Search size={24} color='#F3F3F3' />
                                </div>
                            }
                            prefix={<IoLocationOutline size={24} color='#5C5C5C' />}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                boxShadow: "none"
                            }}
                            placeholder='Search your destination'
                            className='placeholder:text-[#767676] placeholder:text-[16px] placeholder:font-bold placeholder:leading-[14px]'
                        />

                        <div className='flex items-center justify-between gap-10' id="search-filter">
                            <Select
                                placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Property Area</p>}
                                style={{
                                    width: "100%",
                                    height: 48,
                                    borderRadius: 24,
                                    padding: 0
                                }}
                                
                                suffixIcon={
                                    <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                        <TiArrowSortedDown size={24} color='#00809E' />
                                    </div>
                                }
                            >
                                <Select.Option value="Sydney">Sydney</Select.Option>
                                <Select.Option value="Melbourne">Melbourne</Select.Option>
                                <Select.Option value="Brisbane">Brisbane</Select.Option>
                                <Select.Option value="Adelaide">Adelaide</Select.Option>
                                <Select.Option value="Hobart">Hobart</Select.Option>
                                <Select.Option value="Perth">Perth</Select.Option>
                            </Select>

                            <div onClick={()=>setOpen(true)} className='flex items-center gap-3 cursor-pointer'>
                                <SlidersHorizontal size={14} color='#5C5C5C' />
                                <p className='text-base text-[16px] font-normal leading-6'>Filter</p>
                            </div>
                        </div>
                    </div>

                    {/* property tainer */}
                    <div className='flex-1 overflow-y-auto mt-1 chat'>
                        {
                            [...Array(10)].map((item, index)=>{
                                return(
                                    <div key={index} className='border bg-white rounded-lg mb-2 border-gray-50 p-[10px]'>

                                        <div className='flex items-center justify-between mb-2'>
                                            <div className='flex items-center gap-4 '>
                                                <Image
                                                    alt='Logo' src={Person} width={30} height={30}
                                                    style={{borderRadius: "100%", objectFit: "contain"}}
                                                />
                                                <Heading name="Villa in Tetouan" style="font-bold text-[18px] leading-[27px] text-base"/>
                                            </div>
                                            <Heart size={24} color='red' fill='transparent' />
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <p className='text-base text-sm  flex items-center gap-2 leading-[21px] font-normal'>
                                                <TfiLocationPin size={22} color='#5C5C5C'/> 
                                                55/A , b park road , Abcd area, city
                                            </p>
                                            <h1 className='text-primary font-semibold text-[24px] leading-5'>$100<sub className='font-normal'>/pw</sub></h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='col-span-8 w-full h-full overflow-hidden p-3'>
                    <ReactMapGL
                        {...viewport}
                        style={{width: "100%", height: "100%", borderRadius: 20}}
                        mapboxAccessToken="pk.eyJ1Ijoib2huYWRpciIsImEiOiJjbGYzbXB2cG4wcjNsM3FuZGkyeXgzaGp3In0.UW7J5lIaWc-P3nXa2WmRxQ"
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        onMove={handleViewportChange}
                    >
                        {
                            properties?.map((item, index)=>{
                                return(
                                    <Marker
                                        key={index}
                                        latitude={item.latitude}
                                        longitude={item.longitude}
                                    >
                                        <div>
                                            <Image
                                                src={marker}
                                                alt='marker'
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                    </Marker> 
                                )
                            })
                        }
                          
                    </ReactMapGL>
                </div>

            </div>

            <Filter
                open={open}
                setOpen={setOpen}
            />

        </div>
    )
}

export default SearchFilter