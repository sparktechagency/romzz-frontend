"use client";
import Heading from '@/components/shared/Heading';
import Modal from '@/components/shared/Modal';
import React, { useState } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import { SlBadge } from "react-icons/sl";

const SubscriptionClient = () => {
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);


    const packages =[
        {
            name: "Regular",
            price: 10,
            details: [
                "3 Post",
                "6 Months Validity",
                "Rules",
                "Rules"
            ]
        },
        {
            name: "Standard",
            price: 20,
            details: [
                "6 Post",
                "6 Months Validity",
                "Rules",
                "Rules"
            ]
        },
        {
            name: "Premium",
            price: 20,
            details: [
                "6 Post",
                "12 Months Validity",
                "Rules",
                "Rules"
            ]
        }
    ]

    const body=(
        <div>
            <div className='flex items-center justify-between'>
                {
                    packages?.map((item, index)=>{
                        return(
                            <div 
                                key={index}
                                style={{
                                    width: 300,
                                    height: 465,
                                    backgroundImage:  index === 1 ? `url('/premium.png')` : `url('/regular.png')`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "container",
                                    borderRadius: 8
                                }}
                                className='border border-gray-400 border-opacity-[50%] p-5'
                            >
                                <SlBadge size={48} color={`${index === 1 ? "#FDD990" : "#333333"}`}  />
                                <p className={` ${index === 1 ? "text-[#FEFEFE]" : "text-[#333333]"} text-[24px] leading-[36px] font-semibold mt-[25px]`}>{item.name}</p>
                                <p className={`${index === 1 ? "text-[#FF9773]" : "text-primary"} text-[14px] leading-5 font-semibold mb-6`}>Package</p>

                                <h1 className={` ${index === 1 ? "text-[#FEFEFE]" : "text-[#333333]"}  font-semibold text-[40px] leading-[60px]`}>$100/<sub className='font-normal'>pw</sub></h1>

                                <div className='flex items-center justify-center my-6'>
                                    <button 
                                        className={`
                                            ${index === 1 ? "text-[#FEFEFE] bg-[#FF9773]" : "bg-primary text-[#FAFAFA]"}
                                            
                                            rounded-3xl mx-auto w-fit px-4 h-10 text-[14px] leading-6 font-bold 
                                        `}
                                    >
                                        Buy {item.name} Subscription
                                    </button>
                                </div>

                                <ul className='grid grid-cols-1 gap-2'>
                                    {
                                        item.details.map((details, key)=>{
                                            return(
                                                <li 
                                                    key={key} 
                                                    className={`list-disc list-inside text-[16px] leading-6 font-normal text-[#5C5C5C] ${index === 1 ? "text-[#F3F3F3]" : "text-[#5C5C5C]"}`}
                                                >
                                                    {details}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>




                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

    const detailsBody=(
        <div>
            <div
                style={{
                    width: 300,
                    height: 465,
                    backgroundImage:  `url('/regular.png')`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "container",
                    borderRadius: 8
                }}
                className='border border-gray-400 border-opacity-[50%] p-5'
            >
                <SlBadge size={48} color={`#333333`}  />
                <p className={` text-[#333333] text-[24px] leading-[36px] font-semibold mt-[25px]`}>{"Regular"}</p>
                <p className={`text-primary text-[14px] leading-5 font-semibold mb-6`}>Package</p>

                <h1 className={` text-[#333333]  font-semibold text-[40px] leading-[60px]`}>$100/<sub className='font-normal'>pw</sub></h1>

                <p className='text-[#FF9773] my-4 text-[24px] leading-6 font-normal'>Deadline : 30/12/2024</p>

                <ul className='grid grid-cols-1 gap-2'>
                    {
                        ["3 Post", "6 Months Validity", "Rules", "Rules"].map((details, key)=>{
                            return(
                                <li 
                                    key={key} 
                                    className={`list-disc list-inside text-[16px] leading-6 font-normal text-[#5C5C5C] "text-[#5C5C5C]"`}
                                >
                                    {details}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )


    return (
        <div>
            <div className='flex items-center justify-between'>
                <Heading name="Booking History" style="font-normal text-[24px] leading-[36px] text-[#151515]"/>
                <button onClick={()=>setOpen(true)} className='bg-primary rounded-3xl w-[144px] h-10 text-[14px] leading-6 font-bold text-[#FAFAFA]'>Buy Subscription</button>
            </div>


            <table className="w-full rounded-[5px] mt-3">
                <tr className="text-left w-full bg-[#FFDFD4]">
                    {
                        ["S.no ", "Package name", "Dateline", "Package Post", "Completed Post", "Action"].map((item, index)=>
                        <th key={index} className={`text-[16px] text-center py-2 leading-6 text-[#000000]`}>
                            {item}
                        </th>
                        )
                    }
                </tr>

                <tbody className='bg-white'>
                    {
                        [...Array(2)]?.map((item, index)=>
                            <React.Fragment key={index}>
                                <tr>
                                    <td className='h-[50px] text-center text-[16px] leading-6 text-[#767676] font-normal'>{index + 1}</td>
                                    <td className='h-[50px] text-center text-[16px] leading-6 text-[#767676] font-normal'>Regular</td>
                                    <td className='h-[50px] text-center text-[16px] leading-6 text-[#767676] font-normal'>30/12/2024</td>
                                    <td className='h-[50px] text-center text-[16px] leading-6 text-[#767676] font-normal'>4</td>
                                    <td className='h-[50px] text-center text-[16px] leading-6 text-[#767676] font-normal'>1</td>
                                    <td className='h-[50px] text-[16px] flex items-center justify-center leading-5 text-[#636363] font-normal'>
                                        <IoIosInformationCircle className='cursor-pointer' onClick={()=>setDetailsOpen(true)} size={24} color='#25B7D3' />
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    }
                </tbody>
            </table>


            <Modal
                title='Subscription Packages'
                open={open}
                setOpen={setOpen}
                body={body}
                width={1000}
            />

            <Modal
                title='Subscription Packages Details'
                open={detailsOpen}
                setOpen={setDetailsOpen}
                body={detailsBody}
                width={350}
            />


        </div>
    )
}

export default SubscriptionClient