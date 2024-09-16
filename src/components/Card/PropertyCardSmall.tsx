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
const PropertyCardSmall = ({ property }: { property: TProperty }) => {
  const wishLists = useAppSelector((state) => state.wishlist.properties);
  const isInWishlist = wishLists.some(
    (wishlistProperty) => wishlistProperty._id === property._id
  );
  const dispatch = useAppDispatch();
  const handleWishList = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(property._id));
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
    <div className="pb-2 h-full">
      <div
        className="bg-white max-w-[240px] min-h-[320px] group p-2 rounded-lg flex flex-col"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Link
          href={`/details/${property._id}`}
          className="mb-4 h-[150px] overflow-hidden flex-grow"
        >
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
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-primary font-semibold text-[24px] leading-5">
            ${property.price}
            <sub className="font-normal">/{property.priceType}</sub>
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
    </div>
  );
};

export default PropertyCardSmall;
