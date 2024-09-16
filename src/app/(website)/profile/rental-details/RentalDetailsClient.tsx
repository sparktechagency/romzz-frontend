"use client";
import HostRentCard from "@/components/Card/HostRentCard";
import PropertyVerification from "@/components/Profile/PropertyVerification";
import RentPost from "@/components/Profile/RentPost";
import Heading from "@/components/shared/Heading";
import Modal from "@/components/shared/Modal";
import { Pagination } from "antd";
import React, { useState } from "react";

const RentalDetailsClient = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);  
  const [rentData , setRentData]= useState({}) 
  console.log();

  const [openRentModal, setOpenRentModal] = useState(false); 

  return (
    <div>
      {/* heading */}
      <div className="flex items-center justify-between">
        <Heading
          name="Booking History"
          style="font-normal lg:text-[24px] text-[20px] lg:leading-[36px]  leading-6 text-[#151515]"
        />
        <div className="flex items-center gap-6">
          <p className="text-[#FF9773] font-bold text-[16px] leading-6">
            Remaining Post: 3
          </p>
          <button
            onClick={() => setOpen(true)}
            className="bg-primary rounded-3xl w-[110px] h-10 text-[14px] leading-6 font-bold text-[#FAFAFA]"
          >
            New Post
          </button>
        </div>
      </div>

      {/* property post */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {[...Array(3)].map((property, index) => {
          return (
            <div key={index} className="bg-white p-2 rounded-lg">
              <HostRentCard
                setOpenRentModal={setOpenRentModal}
                openRentModal={openRentModal}
                open={open}
                setOpen={setOpen}
              />
            </div>
          );
        })}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center mt-6">
        <Pagination current={page} total={50} />
      </div>

      <Modal
        title="Property Verification"
        open={open}
        setOpen={setOpen}
        body={
          <PropertyVerification
            open={open}
            setOpen={setOpen}
            openRentModal={openRentModal} 
            setRentData={setRentData}
            setOpenRentModal={setOpenRentModal}
          />
        }
        width={852}
      />

      <Modal
        title="Property New Post"
        open={openRentModal}
        setOpen={setOpenRentModal}
        body={<RentPost open={openRentModal} setOpen={setOpenRentModal} rentData={rentData} />}
        width={852}
      />
    </div>
  );
};

export default RentalDetailsClient;
