"use client"
import Heading from '@/components/shared/Heading';
import { imageUrl } from '@/redux/api/api';
import { addToWishlist, removeFromWishlist } from '@/redux/features/web/slices/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { notification } from 'antd';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { TfiLocationPin } from 'react-icons/tfi';

const LocationCard = (item:any) => {  
    //console.log(item.item);
    const wishLists = useAppSelector((state) => state.wishlist.properties);
    const isInWishlist = wishLists.some(
      (wishlistProperty) => wishlistProperty._id === item?.item?._id
    ); 


    //  mark as wishlist  
const dispatch = useAppDispatch();
const handleWishList = () => { 

  if (isInWishlist) {
    dispatch(removeFromWishlist(item?.item?._id));
    notification.success({
      message: "Romzz",
      description: "Property removed from wishlist successfully",
      duration: 1.5,
    });
  } else {
    dispatch(addToWishlist(item?.item));
    notification.success({
      message: "Romzz",
      description: "Property added to wishlist successfully!",
      duration: 1.5,
    });
  }
};
    return (
        <div>
               <div  className="border bg-white rounded-lg mb-2 border-gray-50 p-[10px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Logo"
                      src={`${imageUrl}${item?.item?.createdBy?.avatar}`}
                      width={30}
                      height={30}
                      style={{ borderRadius: "100%", objectFit: "contain" }}
                    />
                    <Heading name={item?.item?.title} style="font-bold text-[18px] leading-[27px]" />
                  </div>
                  <Heart
            className="cursor-pointer"
            onClick={handleWishList}
            size={24}
            color={isInWishlist ? "red" : "#333"}
            fill={isInWishlist ? "red" : "transparent"}
          />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm flex items-center gap-2 font-normal">
                    <TfiLocationPin size={22} color="#5C5C5C" />
                   {item?.item?.address}
                  </p>
                  <h1 className="text-primary font-semibold text-[24px]">{item?.item?.price}<sub>{item?.item?.priceType === "day" ? `/pd` : item?.item?.priceType === "week" ? "/pw" : item?.item?.item?.priceType === "month" ? "/pm" : "/py" }</sub></h1>
                </div>
              </div>
        </div>
    );
};

export default LocationCard;