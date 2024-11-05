"use client";
import Image from "next/image";
import React from "react";
import Heading from "../shared/Heading";
import { TfiLocationPin } from "react-icons/tfi";
import { imageUrl } from "@/redux/api/api";
import moment from "moment";

interface IHostRentCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  openRentModal: boolean;
  setOpenRentModal: (openRentModal: boolean) => void; 
  property:any;
  setUpdateInfo:any; 
  refetchAllPost:any
}

const HostRentCard: React.FC<IHostRentCardProps> = ({
  setOpen,
  setOpenRentModal, 
  property  , 
  setUpdateInfo ,
  refetchAllPost
}) => {  
  const handlEdit =()=>{
    setOpenRentModal(true) 
    setUpdateInfo(property)
  }

  const {propertyImages , _id , title , status,createdBy,category,address,priceType,price ,createdAt} = property;

  return (
    <div className="flex lg:flex-row flex-col gap-6 p-2">
      <div className="w-[344px] h-[226px] relative">
        <Image alt="Property" src={`${imageUrl}${propertyImages[0]}`} fill />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-primary font-semibold text-[24px] leading-5 mb-2">
            ${Math.ceil(price)}<sub className="font-normal">{priceType === "day" ? `/pd` : priceType === "week" ? "/pw" : priceType === "month" ? "/pm" : "/py" }</sub>
          </h1>
          <button
            onClick={() =>handlEdit()}
            className="w-[40px] h-6 bg-[#FAFAFA] text-[#767676] rounded-3xl font-bold text-[12px] leading-4"
          >
            Edit
          </button>
        </div>
        <p className="text-secondary text-sm my-2 leading-[18px] font-medium">
          {category}
        </p>
        <div className="flex items-center gap-4">
          <Image
            alt="Logo"
            src={ createdBy?.avatar?.startsWith("https") ? createdBy?.avatar : `${imageUrl}${createdBy?.avatar}`}
            width={30}
            height={30}
            style={{ borderRadius: "100%", objectFit: "contain" }}
          />
          <Heading
            name={title}
            style="font-bold text-[18px] leading-[27px] text-base"
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <TfiLocationPin size={22} color="#5C5C5C" />
          <p className="text-base text-sm  leading-[21px] font-normal">
           {address}
          </p>
        </div>

        <p className="text-secondary text-sm my-2 leading-[21px] font-normal">
          Post Date : {moment(createdAt).format('DD MMM YYYY')}
        </p>
        <p className="text-secondary text-right text-sm my-2 leading-[21px] font-normal">
        {status}
        </p>
      </div>
    </div>
  );
};

export default HostRentCard;
