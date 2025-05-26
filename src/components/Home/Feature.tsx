import React from 'react';
import list from "@/assets/bed.jpg"
import host from "@/assets/homepage-desktop-woman.webp"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useUser } from '@/app/provider/User';

const Feature = () => {
    const router = useRouter();
    const {user} = useUser();

    const handleClick = (name:string)=>{
        if(user?.email && name === "create"){
            router.push("/profile/rental-details?status=true");
        }else{
            router.push("/login?redirect=/profile/rental-details?status=true")
        }
    }
    return (
        <div className='container my-6'>
            <div className='flex items-center justify-center gap-10'>
                    <div 
                        onClick={()=>handleClick("create")}
                        className='rounded-lg flex justify-between items-center p-3 w-[450px] lg:w-auto gap-3'
                        style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}
                    >
                        <div>
                            <p className='font-semibold text-[18px]'>
                                Create a free <br /> 
                                property listing
                            </p>
                            <button className='bg-primary text-white h-10 rounded-md px-3 mt-3'>I need flatmate</button>
                        </div>
                        <Image alt="s" src={list} width={250} height={200}  />
                    </div>
                <Link href={"/services"}>
                    <div 
                        className='rounded-lg flex justify-between items-center p-3 w-[450px] lg:w-auto gap-3'
                        style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}
                    >
                        <div>
                            <p className='font-semibold text-[18px]'>
                                Create a free <br /> 
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