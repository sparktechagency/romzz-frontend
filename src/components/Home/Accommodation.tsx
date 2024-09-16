"use client";
import React from "react";
import Heading from "../shared/Heading";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { useGetApprovePropertiesQuery } from "@/redux/features/web/api/propertyApi";
import { TProperty } from "@/types/propertyTypes";
import PropertyCard from "../Card/PropertyCard";

const Accommodation = () => {
  const { data } = useGetApprovePropertiesQuery([]);
  const ArrowLeft = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => (
    <button
      {...props}
      className="prev absolute z-[1] top-[50%] left-0 bg-black bg-opacity-[30%] w-9 h-9 rounded-full flex items-center justify-center"
    >
      <BiChevronLeft size={24} color="#EEEEEE" className="mx-auto " />
    </button>
  );

  const ArrowRight = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => (
    <button
      {...props}
      className="next bg-black bg-opacity-[30%] w-9 h-9 rounded-full flex items-center justify-center absolute top-[50%] right-0"
    >
      <BiChevronRight size={24} color="#EEEEEE" className="mx-auto" />
    </button>
  );

  const settings: Settings = {
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    dots: false,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-[60px] container mb-20">
      {/* heading  */}
      <div className="flex items-center justify-between mb-5">
        <Heading style="font-normal lg:text-[32px] text-[24px] leading-[48px] text-[#3E3E3E]">
          <span className="text-primary">Accommodation</span> For you
        </Heading>
        <Link
          href={"/services"}
          className="text-secondary underline text-[20px] leading-6 font-normal"
        >
          View All
        </Link>
      </div>

      {/* slider accommodation */}
      <div className="h-fit">
        <Slider {...settings}>
          {data?.data?.slice(0, 10)?.map((property: TProperty, index) => {
            return <PropertyCard key={index} property={property} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Accommodation;
