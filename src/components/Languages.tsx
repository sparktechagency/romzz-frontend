"use client";
import { ConfigProvider, Select } from 'antd';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import English from "@/assets/english.jpg";
import French from "@/assets/french.jpg";
import Chinese from "@/assets/chinese.png";
import Spanish from "@/assets/spanish.png";
import { IoIosArrowDown } from 'react-icons/io';
import Cookies from "js-cookie";

interface ILanguageProps {
  value: string;
  name: string;
  image: StaticImageData;
}

const Languages = () => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const storedLanguage = Cookies.get("currentLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

   const switchLanguage = (lang: string) => {
    // Store selected language in cookies
    Cookies.set("currentLanguage", lang, { expires: 30 });

    // Correctly set the Google Translate cookie (googtrans)
    const googleTransValue = `/en/${lang}`;

    // Remove any existing "googtrans" cookies before setting a new one
    document.cookie =
      "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // after add domain 
    // document.cookie =
    //   "googtrans=; domain=.1plus1dating.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Replace with your actual domain

    // Now, set the new "googtrans" cookie
    document.cookie = `googtrans=${googleTransValue}; path=/; max-age=${30 * 24 * 60 * 60
      }`;

    // for domain 
    // document.cookie = `googtrans=${googleTransValue}; domain=.1plus1dating.com; path=/; max-age=${
    //   30 * 24 * 60 * 60
    // };`;

    // Update state
    setLanguage(lang);

    // Reload the page to apply the translation
    window.location.reload();
  };
 

  const languages: ILanguageProps[] = [
    { name: "English", value: "en", image: English },
    { name: "Spanish", value: "es", image: Spanish },
    { name: "French", value: "fr", image: French },
    { name: "Chinese", value: "zh-CN", image: Chinese },
  ];

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
          },
        },
      }}
    >
      <Select
        style={{ height: 40 }}
        className="w-fit sm:w-[200px]"
        placeholder={
          <div className="flex items-center gap-3">
            <MdOutlineTranslate size={18} color="black" />
            <p className="font-normal text-[16px] leading-6 text-black">Language</p>
          </div>
        }
        suffixIcon={<IoIosArrowDown color="black" size={20} />}
        value={language}
        onChange={switchLanguage}
      >
        {languages.map((lang, index) => (
          <Select.Option value={lang.value} key={index}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={lang.image}
                alt="language icon"
                width={35}
                height={35}
                style={{
                  marginRight: 8,
                  mixBlendMode: "multiply",
                }}
              />
              {lang.name}
            </div>
          </Select.Option>
        ))}
      </Select>
    </ConfigProvider>
  );
};

export default Languages;
