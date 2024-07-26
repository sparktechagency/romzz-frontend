"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Logo from "@/assets/Logo.png"
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { Badge, Drawer } from 'antd';
import { Bell, Heart } from 'lucide-react';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 5) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const item = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Services",
            path: "/services"
        },
        {
            label: "About",
            path: "/about"
        },
        {
            label: "News",
            path: "/news"
        },
        {
            label: "Supports",
            path: "/supports"
        }
    ]

    return (
        <div 
            className={`
                fixed z-10 top-0 w-full left-0 transition-all duration-200
                ${isScrolled ? "bg-white bg-opacity-100" : "bg-[#F3F3F3] bg-opacity-[80%]"}
            `}
        >

            <div className='container relative  flex items-center justify-between h-[96px]'>

                {/* logo */}
                <Link href={"/"}>
                    <Image alt='Logo' src={Logo} width={164} height={70} />
                </Link>

                {/* routes container */}
                <div className="hidden  lg:flex items-center">
                    {
                        item.map((menu, index) => {
                            return(
                                <Link 
                                    key={index} 
                                    className={`font-normal w-[86px] h-12 text-center flex items-center justify-center text-[16px] leading-5 text-base`} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className='flex items-center gap-6'>
                    <Link href={"/wishlist"}>
                        <Badge count={5} color='#FF9773' >
                            <Heart color='#767676' size={24} />
                        </Badge>
                    </Link>

                    <Link 
                        href={"/notification"} >
                        <Badge count={5} color='#FF9773'>
                            <Bell color='#767676' size={24} />
                        </Badge>
                    </Link>

                    <Link 
                        href={"/login"} 
                        className='font-normal w-[120px] h-12 rounded-[24px] bg-primary text-[#F3F3F3] hidden  lg:flex items-center justify-center gap-2 text-[16px] leading-6'
                    >
                        <AiOutlineUser size={20} color='#F3F3F3'/> Sign In
                    </Link>

                </div>
            </div>
            

            <Drawer
                title={<div className='flex items-center justify-between'>
                    <Link href={"/"}>
                        <Image alt='Logo' src={Logo} width={40} height={40} />
                    </Link>
                    {/* <X onClick={()=>setOpenDrawer(false)} color='black' className='cursor-pointer' size={30} /> */}
                </div>}
                placement={"left"}
                closable={false}
                onClose={()=>setOpenDrawer(false)}
                open={openDrawer}
                key={"left"}
                
            >
                <div className="flex items-start justify-center flex-col gap-6">
                    {
                        item.map((menu, index) => {
                            return(
                                <Link 
                                    key={index} 
                                    className={`
                                        h-[21px]
                                        font-normal text-[16px] leading-6 
                                        text-[#555656] 
                                        border-[#D9D9D9]
                                        hover:text-primary
                                    `} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default Navbar