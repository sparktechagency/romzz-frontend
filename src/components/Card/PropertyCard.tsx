"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import Heading from "../shared/Heading";
import { TfiLocationPin } from "react-icons/tfi";
import { TProperty } from "@/types/propertyTypes";
import Image from "next/image";
import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/web/slices/wishlistSlice";

const PropertyCard = ({ property }: { property: TProperty }) => {
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
    <div className="pb-2">
      <div
        className="group p-2 rounded-lg"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Link href={`/details/${property._id}`}>
          <div className="mb-4 h-[208px] w-[315px]  overflow-hidden">
            <Image
              alt="Property Image"
              height={200}
              width={300}
              src={property.propertyImages[0]}
              style={{ objectFit: "cover" }}
              className="group-hover:scale-105 w-full transition-all duration-300"
            />
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-primary font-semibold text-[24px] leading-5">
            ${property.price}
            <sub className="font-normal">/{property.priceType}</sub>
          </h1>
          <Heart
            className="cursor-pointer"
            onClick={handleWishList}
            size={24}
            color={isInWishlist ? "red" : "#333"}
            fill={isInWishlist ? "red" : "transparent"}
          />
        </div>
        <p className="text-secondary capitalize text-sm my-2 leading-[18px] font-medium">
          {property.category?.replace(/-/g, " ") || "General"}
        </p>

        <div className="flex items-center gap-4">
          <Image
            alt="Avatar"
            src={property.createdBy.avatar}
            width={30}
            height={30}
            style={{ borderRadius: "100%", objectFit: "contain" }}
          />
          <Heading
            name={`Villa in ${property.location.address
              .split(" ")
              .slice(1, 3)
              .join(" ")}`}
            style="font-bold text-[18px] leading-[27px] text-base"
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <TfiLocationPin size={22} color="#5C5C5C" />
          <p className="text-base text-sm leading-[21px] font-normal">
            {property.location.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
