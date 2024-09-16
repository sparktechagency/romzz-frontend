"use client";
import Heading from "@/components/shared/Heading";
import { Input, Pagination, Select } from "antd";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { TfiLocationPin } from "react-icons/tfi";
import { TiArrowSortedDown } from "react-icons/ti";
import Property from "@/assets/property.png";
import Person from "@/assets/person.png";
import Filter from "@/components/Filter";
import { useGetApprovePropertiesQuery } from "@/redux/features/web/api/propertyApi";
import PropertyCard from "@/components/Card/PropertyCard";

const ServiceClient = () => {
  const [page, setPage] = useState<number>(1);
  const { data } = useGetApprovePropertiesQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
  ]);
  console.log(data);

  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const initialTab =
      new URLSearchParams(window.location.search).get("tab") || "All";
    const initialPage =
      new URLSearchParams(window.location.search).get("page") || "1";
    setPage(Number(initialPage));
    setTab(initialTab);
  }, []);

  const handleTabChange = (tab: string) => {
    setTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div
        style={{
          //   width: "100%",
          //   height: "350px",
          background: "#F3F3F3",
          //   borderRadius: "0 0 50px 50px",
        }}
        className="flex flex-col items-center justify-center lg:h-[350px] h-full w-[100%] lg:rounded-b-[50px] rounded-b-[10px] lg:py-0 py-3 "
      >
        <div
          data-aos="fade-up"
          className="lg:w-[874px] bg-white lg:h-[78px] py-2 lg:rounded-[59px] rounded-[20px] flex lg:flex-row  flex-col items-center justify-between  pr-3"
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

          <div id="banner" className="lg:my-0 my-3 ">
            <Select
              placeholder={
                <p className="text-base text-[16px] leading-6 font-normal">
                  Property Area
                </p>
              }
              style={{
                width: 255,
                height: 48,
                borderRadius: 24,
              }}
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

          <div className="flex items-center justify-between gap-6 w-full lg:w-[200px] lg:px-0 px-3  ">
            <div
              onClick={() => setOpen(true)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <SlidersHorizontal size={18} color="#5C5C5C" />
              <p className="text-base text-[16px] font-normal leading-6">
                Filter
              </p>
            </div>
            <Link href={"/filter?search="}>
              <div className="lg:w-[62px] w-[40px] cursor-pointer lg:h-[62px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                <Search size={24} color="#F3F3F3" />
              </div>
            </Link>
          </div>
        </div>

        {/* property type section */}
        <div className="mt-8">
          <ul className="flex lg:flex-row flex-wrap items-center justify-center gap-6">
            {["All", "Room mate", "Flat mate", "Whole Unit", "House"].map(
              (item, index) => {
                return (
                  <li
                    key={index}
                    className={`
                                            font-normal w-fit  h-12 text-center 
                                            ${index === 0 ? "px-10" : "px-5"}
                                            flex items-center justify-center 
                                            text-[16px] leading-5 text-base
                                            ${
                                              item === tab
                                                ? "bg-secondary "
                                                : "bg-[#ADADAD] "
                                            }
                                            rounded-3xl text-white cursor-pointer
                                        `}
                    onClick={() => handleTabChange(item)}
                  >
                    {item}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>

      {/* all property section */}
      <div className="container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-10  justify-items-center">
        {data?.data.map((property, index) => {
          return <PropertyCard property={property} key={index} />;
        })}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center mt-6">
        <Pagination
          style={{
            margin: "10px",
          }}
          current={Number(page)}
          onChange={handlePageChange}
          pageSize={data?.meta.limit || 10}
          total={data?.meta.total}
        />
      </div>
      <Filter open={open} setOpen={setOpen} />
    </div>
  );
};

export default ServiceClient;
