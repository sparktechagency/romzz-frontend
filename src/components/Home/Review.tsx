"use client";
import React, { useState } from "react";
import Heading from "../shared/Heading";
import Slider, { Settings } from "react-slick";
import { Rate } from "antd";
import review from "@/assets/review.png";
import Image from "next/image";

const Review = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const CustomDot = ({
    onClick,
    active,
  }: {
    onClick: () => void;
    active: any;
  }) => (
    <button
      className={`custom-dot ${active ? "custom-dot-active" : ""}`}
      onClick={onClick}
    >
      <span className="dot-indicator"></span>
    </button>
  );

  const settings: Settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    beforeChange: (current, next) => setSlideIndex(next),
    customPaging: (i) => (
      <CustomDot active={i === slideIndex} onClick={() => setSlideIndex(i)} />
    ),
    dotsClass: "slick-dots custom-dots",
    centerMode: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className="container py-16">
      {/* heading  */}
      <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] text-center mb-6">
        Our Clients <span className="text-primary">Reviews</span>
      </Heading>

      <div>
        <Slider {...settings}>
          {[...Array(5)].map((item, index) => (
            <div
              className={`${
                index === slideIndex ? "slide-active" : ""
              } slide relative`}
              key={index}
            >
              <div className="lg:px-14 px-3 py-6  text-black text-center flex flex-col justify-center items-center gap-3 ">
                <Image alt="person" width={100} height={100} src={review} />
                <p className="text=[#333333] font-normal text-[18px] leading-5">
                  {"Adaline"}
                </p>
                <div className="flex items-center justify-center">
                  <Rate allowHalf defaultValue={2.5} />
                </div>
                <p className="text-[#767676] font-normal text-[16px] leading-5">
                  {
                    "Literally I didn't expect but the facilities and the neighbourhood are so great, not mentioning the nice staffs from the reception."
                  }
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Review;
