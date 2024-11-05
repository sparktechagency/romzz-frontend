import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Heading from "../shared/Heading";
import { TfiLocationPin } from "react-icons/tfi";
import { TProperty } from "@/types/propertyTypes";
import Property from "@/assets/property.png";
import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/web/slices/wishlistSlice";
import { imageUrl } from "@/redux/api/api";


const PropertyCardSmall = ({ property }: { property: TProperty }) => {
  const wishLists = useAppSelector((state) => state?.wishlist?.properties);
  const isInWishlist = wishLists.some(
    (wishlistProperty) => wishlistProperty?._id === property?._id
  ); 

  const dispatch = useAppDispatch();

  const handleWishList = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(property?._id));
      notification.success({
        message: "Romzz",
        description: "Property removed from wishlist successfully",
        duration: 1.5,
      });
    } else {
      dispatch(addToWishlist(property));
      notification.success({
        message: "Romzz",
        description: "Property added to wishlist successfully!",
        duration: 1.5,
      });
    }
  };


  return (
    <div className="pb-2">
      <div
        className="bg-white max-w-[260px]  lg:min-h-[270px] min-h-[240px]  group p-2 rounded-lg flex flex-col"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Link
          href={`/details/${property?._id}`}
          className="lg:mb-4 mb-2 overflow-hidden flex-grow"
        >
          <Image
            alt="Property Image"
            src={
              property?.propertyImages?.length > 0
                ? `${imageUrl}${property?.propertyImages[0]}` 
                : Property
            }
            width={250}
            height={150} 
            // style={{height:"150px"}} 
            className="group-hover:scale-105 object-cover transition-all duration-300  rounded-sm lg:h-[170px] h-[110px]"
          />
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-primary font-semibold lg:text-[24px] text-[21px] leading-5">
            ${property?.price}
            <sub className="font-normal"> {property?.priceType === "day"
                        ? `/pd`
                        : property?.priceType === "week"
                        ? "/pw"
                        : property?.priceType === "month"
                        ? "/pm"
                        : "/py"}</sub>
          </h1>
          <Heart
            onClick={handleWishList}
            color={isInWishlist ? "red" : "#333"} // Change color based on wishlist status
            fill={isInWishlist ? "red" : "transparent"} // Fill color based on wishlist status
            className="cursor-pointer"
            size={24}
          />
        </div>
        <p className="text-secondary capitalize text-sm my-2 leading-[18px] font-medium">
          {property?.category?.replace(/-/g, " ") || "General"}
        </p>
        <div className="flex items-center lg:gap-4 gap-2">
          <Image
            alt="Logo"
            src={ property?.createdBy?.avatar?.startsWith("https") ? property?.createdBy?.avatar : `${imageUrl}${property?.createdBy?.avatar}`}
            width={30}
            height={30}
            style={{ borderRadius: "100%", objectFit: "contain"  }}
          />
          <Heading
            name={`Villa in ${property?.address?.split(" ")
              .slice(1, 2)
              .join(" ")}`}
            style="font-bold text-[18px] leading-[27px] text-base"
          />
        </div>
        <div className="flex items-center gap-2 lg;mt-3 mt-2 h-full">
          <TfiLocationPin size={22} color="#5C5C5C" />
          <p className=" text-sm leading-[21px] font-normal truncate">
            {property?.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSmall;
