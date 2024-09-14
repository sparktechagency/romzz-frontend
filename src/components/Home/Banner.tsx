"use client";
import { Input, Select } from "antd";
import { ChevronDown, Heart, Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import Link from "next/link";
import Filter from "../Filter";
import Property from "@/assets/property.png";
import Image from "next/image";
import Person from "@/assets/person.png";
import Heading from "../shared/Heading";
import { TfiLocationPin } from "react-icons/tfi";
import { useGetHighlightsPropertiesQuery } from "@/redux/features/web/propertyApi";

const Banner = () => {
  const { data } = useGetHighlightsPropertiesQuery({});
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        backgroundImage: `url('/header.png')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "container",
      }}
      className="flex flex-col relative  items-center justify-center border h-[calc(100vh-96px)]"
    >
      <div
        data-aos="fade-down"
        className=" lg:w-[874px] w-[80%] bg-white lg:h-[78px] h-[200px] py-2 lg:rounded-[59px] rounded-[15px] flex lg:flex-row flex-col items-center justify-between  pr-3"
      >
        <div className="lg:w-[350px] w-full">
          <Input
            suffix={
              <Link href={"/search-filter"}>
                <div className="w-10 cursor-pointer h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <FaMapLocationDot size={24} color="#00809E" />
                </div>
              </Link>
            }
            prefix={<IoLocationOutline size={24} color="#5C5C5C" />}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            placeholder="Search your destination"
            className="placeholder:text-[#767676] placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[14px]"
          />
        </div>

        <div className="w-full lg:w-[255px]" id="banner">
          <Select
            placeholder={
              <p className="text-base text-[16px] leading-6 font-normal">
                Property Area
              </p>
            }
            style={{
              borderRadius: 24,
            }}
            className="lg:w-[255px] w-full h-[48px]"
            suffixIcon={
              <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                <TiArrowSortedDown size={24} color="#00809E" />
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
        </div>

        <div className="flex items-center justify-between gap-6 w-full lg:w-[200px] lg:px-0 px-3 ">
          <div
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <p className="text-2xl">
              <SlidersHorizontal color="#5C5C5C" />{" "}
            </p>
            <p className="text-base text-[16px] font-normal leading-6">
              Filter
            </p>
          </div>

          <Link href={"/filter?search="}>
            <div className="lg:w-[62px] cursor-pointer w-[45px] h-[45px] lg:h-[62px] rounded-full bg-primary flex items-center justify-center">
              <p className=" lg:text-[24px] text-[20px]">
                <Search size={24} color="#F3F3F3" />{" "}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 w-full">
        <div className="container  flex items-center justify-center gap-4 mt-20">
          {data?.data?.slice(0, 4)?.map((property, index) => {
            return (
              <Link
                key={index}
                className="pb-2 h-full"
                href={`/details/${property._id}`}
              >
                <div
                  className="bg-white max-w-[240px] min-h-[320px] group p-2 rounded-lg flex flex-col"
                  style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  }}
                >
                  <div className="mb-4 h-[150px] overflow-hidden flex-grow">
                    <Image
                      alt="Property Image"
                      src={
                        property.propertyImages.length > 0
                          ? property.propertyImages[0]
                          : Property
                      }
                      width={225}
                      height={150}
                      className="group-hover:scale-105 object-cover transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-primary font-semibold text-[24px] leading-5">
                      ${property.price}
                      <sub className="font-normal">/{property.priceType}</sub>
                    </h1>
                    <Heart size={24} color="red" fill="transparent" />
                  </div>
                  <p className="text-secondary capitalize text-sm my-2 leading-[18px] font-medium">
                    {property.category?.replace(/-/g, " ") || "General"}
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Logo"
                      src={property.createdBy.avatar}
                      width={30}
                      height={30}
                      style={{ borderRadius: "100%", objectFit: "contain" }}
                    />
                    <Heading
                      name={`Villa in ${property.location.address
                        .split(" ")
                        .slice(1, 2)
                        .join(" ")}`}
                      style="font-bold text-[18px] leading-[27px] text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-3 h-full">
                    <TfiLocationPin size={22} color="#5C5C5C" />
                    <p className="text-base text-sm leading-[21px] font-normal">
                      {property.location.address}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Filter open={open} setOpen={setOpen} />
    </div>
  );
};

export default Banner;
