"use client";
import React from "react";
import Heading from "../shared/Heading";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import Property from "@/assets/property.png";
import Person from "@/assets/person.png";
import Image from "next/image";
import { Heart } from "lucide-react";
import { TfiLocationPin } from "react-icons/tfi";

const Accommodation = () => {
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
          {[...Array(8)].map((item, index) => {
            return (
              <Link key={index} className="pb-2" href={`/details/${index + 1}`}>
                <div
                  className=" max-w-[360px] group p-2 rounded-lg"
                  style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  }}
                >
                  <div className="mb-4 overflow-hidden">
                    <Image
                      alt="Logo"
                      src={Property}
                      style={{ objectFit: "contain" }}
                      className="group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-primary font-semibold text-[24px] leading-5">
                      $100<sub className="font-normal">/pw</sub>
                    </h1>
                    <Heart size={24} color="red" fill="transparent" />
                  </div>
                  <p className="text-secondary text-sm my-2 leading-[18px] font-medium">
                    Whole-unit
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Logo"
                      src={Person}
                      width={30}
                      height={30}
                      style={{ borderRadius: "100%", objectFit: "contain" }}
                    />
                    <Heading
                      name="Villa in Tetouan"
                      style="font-bold text-[18px] leading-[27px] text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <TfiLocationPin size={22} color="#5C5C5C" />
                    <p className="text-base text-sm  leading-[21px] font-normal">
                      55/A , b park road , Abcd area, city
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Accommodation;
