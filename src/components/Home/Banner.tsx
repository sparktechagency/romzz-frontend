"use client";
import { Input, Select } from "antd";
import { ChevronDown, Heart, Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useGetHighlightsPropertiesQuery } from "@/redux/features/web/api/propertyApi";
import PropertyCardSmall from "../Card/PropertyCardSmall";
import Filter from "../Filter";

const Banner = () => {
  const { data } = useGetHighlightsPropertiesQuery({});
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState();
  return (
    <div
      style={{
        width: "100%",
        backgroundImage: `url('/header.png')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "container",
      }}
      className="flex flex-col relative  items-center justify-center border lg:h-[calc(100vh-96px)] h-[110vh]"
    >
      <div
        data-aos="fade-down"
        className=" lg:w-[574px] w-[80%] bg-white lg:h-[78px] h-[200px] py-2 lg:rounded-[59px] rounded-[15px] flex lg:flex-row flex-col items-center justify-between  pr-3"
      >
        <div className="lg:w-[320px] w-full">
          <Input
            suffix={
              <Link href={"search-filter"}>
                <div className="w-10 cursor-pointer lg:h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <FaMapLocationDot className="text-xl" color="#00809E" />
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

        {/* <div className="w-full lg:w-[255px]" id="banner"> 
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
        </div>  */}

        <div className="flex items-center justify-between gap-6 w-full lg:w-[200px] lg:px-0 px-3 ">
          <div
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <p className="">
              <SlidersHorizontal
                size={18}
                color="#5C5C5C"
                className="text-lg"
              />
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

      {/* <div className="lg:absolute left-0 bottom-0 w-full">
        <div className="container  flex  flex-wrap items-center justify-center lg:gap-8 gap-2 lg:mt-20 mt-2">
          {data?.data?.slice(0, 3)?.map((property, index) => {
            return <PropertyCardSmall property={property} key={index} />;
          })}
        </div>
      </div> */}

      <Filter open={open} setOpen={setOpen} setFilter={setFilter} />
    </div>
  );
};

export default Banner;
