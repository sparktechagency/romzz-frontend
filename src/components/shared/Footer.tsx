"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/assets/Logo.png";
import Heading from "./Heading";
import { Button, Input, notification } from "antd";
import facebook from "@/assets/facebok.png";
import instagram from "@/assets/instagram.png";
import linkedin from "@/assets/linkedin.png";
import twitter from "@/assets/twitter.png";
import { useSendGetInTouchEmailMutation } from "@/redux/features/web/api/getInTouchApi";

const Footer = () => {
  const [sendGetInTouchEmail, { isLoading }] = useSendGetInTouchEmailMutation();
  const [keyword, setKeyword] = useState("");

  const item = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Services",
      path: "/services",
    },
    {
      label: "About",
      path: "/about",
    },
  ];

  const items = [
    {
      label: "News",
      path: "/news",
    },
    {
      label: "Terms & Conditions",
      path: "/term-and-conditions",
    },
    {
      label: "Supports",
      path: "/supports",
    },
  ];

  const handleSendGetInTouchEmail = async () => {
    const data = {
      email: keyword,
    };

    try {
      const res = await sendGetInTouchEmail(data).unwrap();

      if (res.success) {
        notification.success({
          message: "Success",
          description: "Email Subscribe successfully!",
          placement: "bottomRight",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Failed to send email", error);
    }
  };
  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url('/footer.png')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container grid grid-cols-12 py-[30px] gap-8 md:gap-0">
        <Link href={"/"} className="col-span-12 mb-4">
          <Image alt="Logo" src={Logo} width={188} height={150} />
        </Link>
        <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4 mx-auto sm:mx-0">
          <p className="text-[#F3F3F3]">
            Fusce quis tellus nulla. Donec sodales mauris eget pellentesque
            hendrerit. Donec molestie non urna sit amet aliquet. Curabitur sit
            amet est nec nulla varius fermentum. explore us
          </p>
        </div>

        <div className="col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-2 flex flex-col gap-4">
          {item.map((menu, index) => {
            return (
              <Link
                key={index}
                className={`
                                        h-[21px]
                                        font-normal text-[16px] leading-6 
                                        text-[#F3F3F3]
                                        border-[#D9D9D9]
                                    `}
                href={`${menu.path}`}
              >
                {menu.label}
              </Link>
            );
          })}
        </div>

        <div className="col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-2 flex flex-col gap-4">
          {items.map((menu, index) => {
            return (
              <Link
                key={index}
                className={`
                                        h-[21px]
                                        font-normal text-[16px] leading-6 
                                        text-[#F3F3F3]
                                        border-[#D9D9D9]
                                    `}
                href={`${menu.path}`}
              >
                {menu.label}
              </Link>
            );
          })}
        </div>

        <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4">
          <Heading
            name="Get in touch !"
            style="font-semibold text-[16px] leading-[20px] text-[#F3F3F3] mb-2"
          />
          <div className="w-full flex md:items-center flex-col md:flex-row gap-4">
            <Input
              placeholder="Enter Your Email"
              style={{
                width: "100%",
                height: 40,
                border: "1px solid #BBBBBB",
                boxShadow: "none",
                outline: "none",
                color: "#5C5C5C",
                background: "#FFFFFF",
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="placeholder:text-[#5C5C5C]"
            />

            <Button
              onClick={handleSendGetInTouchEmail}
              htmlType="submit"
              style={{
                background: "#00809E",
                color: "white",
                border: "none",
                height: 42,
              }}
            >
              {isLoading ? "Loading..." : "   Subscribe"}
            </Button>
          </div>
          <div className="flex items-center gap-6 mt-6">
            <a href="https://www.facebook.com/" target="_blank">
              <Image alt="social-link" src={facebook} width={32} height={32} />
            </a>

            <a href="https://www.instagram.com/" target="_blank">
              <Image alt="social-link" src={instagram} width={32} height={32} />
            </a>

            <a href="https://www.linkedin.com/" target="_blank">
              <Image alt="social-link" src={linkedin} width={32} height={32} />
            </a>

            <a href="https://www.twitter.com/" target="_blank">
              <Image alt="social-link" src={twitter} width={32} height={32} />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#003642] py-3">
        <p className="text-center text-[#ffffff]">
          © Copyright UX/UI 2204 Team Md. Asadujjaman Mahfuz
        </p>
      </div>
    </div>
  );
};

export default Footer;
