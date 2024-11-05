"use client";
import Heading from "@/components/shared/Heading";
import { Input, Pagination, Select } from "antd";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import Filter from "@/components/Filter";
import { useGetApprovePropertiesQuery } from "@/redux/features/web/api/propertyApi";
import PropertyCard from "@/components/Card/PropertyCard";

const ServiceClient = () => {
  const [page, setPage] = useState<number>(1); 
  const [filter , setFilter] = useState({})   
  //console.log(filter);
  const { data } = useGetApprovePropertiesQuery({page ,filter });
  //console.log(data);

  const [tab, setTab] = useState(""); 
  //console.log(tab);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const initialTab =
      new URLSearchParams(window.location.search).get("tab") || "";
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

    const data = {
      category: tab
    }  

    setFilter(data)

  };

  const handlePageChange = (page: number) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }; 

  const categories = [
    {
      name: "All" ,
      value:""
  } , 
    {
      name: "Flat mate" ,
      value:"flat-mate"
  } , 
  {
      name: "Room mate" ,
      value:"room-mate"
  } , 

  ]

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
          className="lg:w-[574px] bg-white lg:h-[78px] py-2 lg:rounded-[59px] rounded-[20px] flex lg:flex-row  flex-col items-center justify-between  pr-3"
        >
          <div className="lg:w-[320px] w-full">
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
              <div className="lg:w-[62px] w-[40px] cursor-pointer lg:h-[62px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                <Search size={24} color="#F3F3F3" />
              </div>
          </div>
        </div>

        {/* property type section */}
        <div className="mt-8">
          <ul className="flex lg:flex-row flex-wrap items-center justify-center gap-6">
            {categories.map(
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
                                              item?.value === tab
                                                ? "bg-secondary "
                                                : "bg-[#ADADAD] "
                                            }
                                            rounded-3xl text-white cursor-pointer
                                        `}
                    onClick={() => handleTabChange(item?.value)}
                  >
                    {item?.name}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>

      {/* all property section */}
      <div className="container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-10  justify-items-center">
        {data?.data?.map((property, index) => {
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
          total={data?.meta.total}
        />
      </div>
      <Filter open={open} setOpen={setOpen}  setFilter={setFilter}  />
    </div>
  );
};

export default ServiceClient;
