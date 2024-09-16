/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Heading from "@/components/shared/Heading";
import React, { useEffect, useState } from "react";

import PropertyCard from "@/components/Card/PropertyCard";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const WishlistClient = () => {
  const wishLists = useAppSelector((state) => state.wishlist.properties);
  return (
    <div className="container pt-6">
      {/* heading */}
      <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] mb-8">
        <span className="text-primary">Favorite</span> Deals
      </Heading>

      {/* wishlist container */}
      {wishLists.length > 0 ? (
        <div className="grid lg:grid-cols-4 grid-cols-1 justify-items-center gap-6 mb-6">
          {wishLists.map((property, index) => {
            return <PropertyCard property={property} key={index} />;
          })}
        </div>
      ) : (
        // Display this section when there are no properties in the wishlist
        <div className="text-center my-12 min-h-[60vh] flex justify-center items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No Wishlist Found
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any properties to your wishlist yet.
              Start exploring and save your favorite properties!
            </p>

            <Link href="/">
              <button className="mt-6 px-6 py-2 bg-primary text-white rounded-md">
                Explore Properties
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistClient;
