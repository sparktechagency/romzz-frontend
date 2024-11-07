import React, { useRef, useState, useCallback, useMemo } from "react";
import Heading from "../shared/Heading";
import Slider, { Settings } from "react-slick";
import { Modal, Rate } from "antd";
import Image from "next/image";
import { useGetHomePageFeedbackQuery } from "@/redux/features/web/api/feedbackApi";
import { imageUrl } from "@/redux/api/api";

interface ReviewItem {
  userId: {
    avatar: string;
    fullName: string;
  };
  rating: number;
  feedback: string;
}

const Review: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { data: userReviews } = useGetHomePageFeedbackQuery(undefined);
  const sliderRef = useRef<Slider>(null);
  const [value, setValue] = useState<ReviewItem | null>(null);
  // console.log(userReviews)

  // Memoized function to avoid unnecessary re-renders
  const handleBeforeChange = useCallback(
    (current: number, next: number) => {
      if (slideIndex !== next) {
        setSlideIndex(next);
      }
    },
    []
  );

  const CustomDot: React.FC<{ onClick: () => void; active: boolean }> = ({
    onClick,
    active,
  }) => (
    <button
      className={`custom-dot ${active ? "custom-dot-active" : ""}`}
      onClick={onClick}
    >
      <span className="dot-indicator"></span>
    </button>
  );

  // Memoize the settings to prevent re-creation on each render
  const settings: Settings = useMemo(
    () => ({
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      dots: true,
      beforeChange: handleBeforeChange,
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
    }),
    [handleBeforeChange, slideIndex]
  );

  return (
    <div className="container py-16">
      {/* Heading */}
      <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] text-center mb-6">
        Our Clients <span className="text-primary">Reviews</span>
      </Heading>

      <div>
        <Slider ref={sliderRef} {...settings}>
          {userReviews?.data?.map((item: ReviewItem, index: number) => (
            <div
              className={`${index === slideIndex ? "slide-active" : ""} slide relative`}
              key={index}
              onClick={() => setValue(item)}
            >
              <div className="lg:px-14 px-3 py-6 text-black text-center flex flex-col justify-center items-center gap-3">
                <Image
                  alt="person"
                  width={100}
                  height={100}
                  style={{ clipPath: "circle()" }}
                  src={
                    item.userId.avatar.startsWith("https")
                      ? item.userId.avatar
                      : `${imageUrl}${item.userId.avatar}`
                  }
                />
                <p className="text-[#333333] font-normal text-[18px] leading-5">
                  {item.userId.fullName}
                </p>
                <div className="flex items-center justify-center">
                  <Rate allowHalf value={item.rating} />
                </div>
                <p className="text-[#767676] font-normal text-[16px] leading-5">
                  {item.feedback.slice(0, 50)}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Modal
        centered
        title="Review Details"
        open={Boolean(value)}
        onCancel={() => setValue(null)}
        footer={null}
      >
        <div className="lg:px-14 px-3 py-6 text-black text-center flex flex-col justify-center items-center gap-3">
          <Image
            alt="person"
            width={100}
            height={100}
            style={{ clipPath: "circle()" }}
            src={
              value?.userId.avatar.startsWith("https")
                ? value.userId.avatar
                : `${imageUrl}${value?.userId.avatar}`
            }
          />
          <p className="text-[#333333] font-normal text-[18px] leading-5">
            {value?.userId.fullName}
          </p>
          <div className="flex items-center justify-center">
            <Rate allowHalf value={value?.rating} />
          </div>
          <p className="text-[#767676] font-normal text-[16px] leading-5">
            {value?.feedback}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Review;