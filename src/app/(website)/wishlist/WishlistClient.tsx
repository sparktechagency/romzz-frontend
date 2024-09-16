"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Heading from "@/components/shared/Heading";

import PropertyCard from "@/components/Card/PropertyCard";
import { useAppSelector } from "@/redux/hooks";

import NoContent from "@/components/shared/NoContent";

const WishlistClient = () => {
  const wishLists = useAppSelector((state) => state.wishlist.properties);
  // console.log(wishLists);
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

        <NoContent
          title=" No Wishlist Found"
          desc="Looks like you haven't added any properties to your wishlist yet.
           Start exploring and save your favorite properties!"
        />
      )}
    </div>
  );
};

export default WishlistClient;
