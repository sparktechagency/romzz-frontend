"use client";
import { Input, Pagination, Select } from 'antd';
import { Heart, Search, SlidersHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import { TiArrowSortedDown } from 'react-icons/ti';
import Link from 'next/link';
import Filter from '@/components/Filter';
import { useGetApprovePropertiesQuery } from '@/redux/features/web/api/propertyApi';
import PropertyCard from '@/components/Card/PropertyCard';

const FilterClient = () => {
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState<number>(1);  
    const [area , setArea] = useState()  
    const [search , setSearch] = useState("") 
    const [filter , setFilter] = useState()  
  
    const { data } = useGetApprovePropertiesQuery({page , search , area , filter}); 


    useEffect(() => {
        const initialPage = new URLSearchParams(window.location.search).get("page") || "1";
        setPage(Number(initialPage));
    }, []);

    const handlePageChange = (page: number) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set("page", page.toString());
        window.history.pushState(null, "", `?${params.toString()}`);
    }; 

    // search location  
    const handleSearchValue =(e:any)=>{
        const searchValue = e.target.value  
        setSearch(searchValue)
       
    } 

    //  select area  
const handleSelectLocation = ( value:any) =>{ 
    setArea(value) 
  }

    return (
        <div>
            <div
                className="bg-[#F3F3F3] flex flex-col items-center justify-center lg:h-[150px] h-full w-[100%] lg:py-0 py-3 "
            >
                <div
                    data-aos="fade-up"
                    className="lg:w-[574px] bg-white lg:h-[78px] py-2 lg:rounded-[59px] rounded-[20px] flex lg:flex-row  flex-col items-center justify-between  pr-3"
                >

                    <div className="lg:w-[320px] w-full">
                        <Input 
                        onChange={(e)=>handleSearchValue(e)}
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
                        <div onClick={()=>setOpen(true)} className="flex items-center gap-3 cursor-pointer">
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
            </div>

            <div className='bg-white container my-10'>

                {/* all property section */}
                <div className="container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6  justify-items-center">
                    {
                        data?.data?.map((property:any, index) => {
                            return <PropertyCard key={index} property={property} />;
                        })
                    }
                </div>

                {/* pagination */}
                <div className="flex items-center justify-center mt-6">
                    <Pagination
                        current={Number(page)}
                        onChange={handlePageChange}
                        total={data?.meta?.total}
                    />
                </div>

            </div>

            <Filter
                open={open}
                setOpen={setOpen} 
                setFilter={setFilter}
            />
        </div>
    )
}

export default FilterClient