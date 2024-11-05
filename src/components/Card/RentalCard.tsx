"use client";
import Image from "next/image";
import React from "react";
import property from "@/assets/property.png";
import Heading from "../shared/Heading";
import Person from "@/assets/person.png";
import { TfiLocationPin } from "react-icons/tfi";
import { imageUrl } from "@/redux/api/api";

interface IRentalCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: any;
  setPropertyId: any;
}

const RentalCard: React.FC<IRentalCardProps> = ({
  setOpen,
  item,
  setPropertyId,
}) => {
  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <div className="lg:w-[344px] w-full lg:h-[226px] h-[150px] relative">
        <Image
          alt="Property"
          src={`${imageUrl}${item?.propertyId?.propertyImages[0]}`}
          fill
        />
      </div>

      <div className=" lg:px-0 px-3 pt-1">
        <h1 className="text-primary font-semibold text-[24px] leading-5">
          €{item?.propertyId?.price}
          <sub className="font-normal">
            {item?.propertyId?.priceType === "day"
              ? `/pd`
              : item?.propertyId?.priceType === "week"
              ? "/pw"
              : item?.propertyId?.priceType === "month"
              ? "/pm"
              : "/py"}
          </sub>
        </h1>
        <p className="text-secondary text-sm my-2 leading-[18px] font-medium">
          {item?.propertyId?.category}
        </p>
        <div className="flex items-center gap-2">
          <Image
            alt="Logo"
            src={ item?.propertyId?.createdBy?.avatar?.startsWith("https") ? item?.propertyId?.createdBy?.avatar :   `${imageUrl}${item?.propertyId?.createdBy?.avatar}`}
            width={30}
            height={30}
            style={{
              borderRadius: "100%",
              height: 30,
              width: 30,
              objectFit: "contain",
            }}
          />
          <Heading
            name={item?.propertyId?.title}
            style="font-bold text-[18px] leading-[27px] text-base"
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <TfiLocationPin size={22} color="#5C5C5C" />
          <p className="text-base text-sm  leading-[21px] font-normal">
            {item?.propertyId?.address}
          </p>
        </div>

        <p className="text-secondary text-sm my-2 leading-[21px] font-normal">
          Price : € {item?.propertyId?.price}
        </p>

        <button
          onClick={() => {
            setOpen(true), setPropertyId(item?.propertyId?._id);
          }}
          className="bg-secondary w-[91px] h-8 rounded-3xl text-[#FAFAFA] text-[14px] leading-6 font-bold"
        >
          Feedback
        </button>
      </div>
    </div>
  );
};

export default RentalCard;
