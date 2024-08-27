"use client";
import { ConfigProvider, Select } from 'antd';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import English from "@/assets/english.jpg";
import French from "@/assets/french.png";
import Chinese from "@/assets/chinese.png";
import Spanish from "@/assets/spanish.png";
import { FaChevronDown } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';

interface ILanguageProps{
    value: string;
    name: string;
    image: StaticImageData
}

const Languages = () => {

    const languages:ILanguageProps[] =[
        {
            name: "English",
            value: "english",
            image: English
        }
        ,
        {
            name: "Spanish",
            value: "spanish",
            image: Spanish
        },
        {
            name: "French",
            value: "french",
            image: French
        },
        {
            name: "Chinese",
            value: "chinese",
            image: Chinese
        }
    ] 

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: "transparent",
                    colorTextPlaceholder: "#838383",
                    borderRadius: 100,
                    colorPrimaryHover: "#00809E",
                    colorPrimary: "#00809E",
                },
                components: {
                    Select: {
                        clearBg: "transparent",
                    }
                }
            }}
        >
            <Select
                style={{ height: 40 }}
                className="w-fit  sm:w-[200px]"
                placeholder={
                    <div className="flex items-center gap-3">
                        <MdOutlineTranslate size={18} color="black" />
                        <p className="font-normal text-[16px] leading-6 text-black">Language</p>
                    </div>
                }
                suffixIcon={<IoIosArrowDown color='black' size={20} />}
            >
                {
                    languages?.map((language: ILanguageProps, index: number)=>{
                        return(
                            <Select.Option value={language.value} key={index}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Image
                                        src={language.image}
                                        alt='language icon'
                                        width={16}
                                        height={16}
                                        style={{ marginRight: 8 }}
                                    />
                                    {language.name}
                                </div>
                            </Select.Option>
                        )
                    })
                }
            </Select>
        </ConfigProvider>
    )
}

export default Languages;