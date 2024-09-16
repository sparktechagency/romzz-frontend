"use client";
import Heading from "@/components/shared/Heading";
import { ChevronDown, MoveLeft, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import ReactMapGL, { Marker } from "react-map-gl";
import marker from "@/assets/marker.png";
import "mapbox-gl/dist/mapbox-gl.css";
import { TfiLocationPin } from "react-icons/tfi";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import Calender from "@/components/Calender";
import HostProfile from "@/components/HostProfile";
import PaymentCard from "@/components/Card/PaymentCard";
import { ConfigProvider, DatePicker } from "antd";
import { useGetSinglePropertyQuery } from "@/redux/features/web/api/propertyApi";

const DetailsClient = ({ id }: { id: string }) => {
  const { data } = useGetSinglePropertyQuery(id);
  // console.log(data);

  const [sliderIndex, setSliderIndex] = useState<number>();
  const [open, setOpen] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: data?.data.location.latitude || 23.810331,
    longitude: data?.data.location.latitude || 90.412521,
    zoom: 15,
  });

  const ArrowLeft = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => (
    <button {...props} className="prev absolute z-[1] top-[40%] -left-2">
      <BiChevronLeft size={24} color="black" className="mx-auto " />
    </button>
  );

  const ArrowRight = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => (
    <button {...props} className="next absolute top-[40%] -right-2">
      <BiChevronRight size={24} color="black" className="mx-auto" />
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
  };

  const [openPayment, setOpenPayment] = useState(false);

  return (
    <div className="container pt-6 mb-8">
      <Link href={"/"}>
        <div className="w-[91px] h-[31px] rounded-[90px] flex  items-center justify-center gap-1 bg-[#F7F7F7] text-base">
          <MoveLeft size={18} color="#5C5C5C" />
          Back
        </div>
      </Link>

      <Heading
        name={`Looking for a room in ${data?.data.location?.address
          ?.split(" ")
          ?.slice(1, 3)
          ?.join(" ")}`}
        style="font-bold lg:text-[32px] text-[24px]  leading-[48px] text-[#333333]"
      />
      <p className="text-secondary text-[14px] leading-5 font-normal">
        Post Date:
        {data?.data?.createdAt
          ? new Date(data.data.createdAt).toLocaleDateString("en-US")
          : "N/A"}
      </p>

      <div className="mt-1 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1 bg-[#F3F3F3] p-2 rounded-lg">
          <div className="h-[406px] w-full relative mb-3">
            <Image
              src={data?.data.propertyImages[0] as string}
              alt="property"
              className="w-full h-full"
              width={500}
              height={200}
              // fill
              style={{ borderRadius: 8 }}
            />
          </div>

          <div className=" relative">
            <Slider {...settings}>
              <div className="w-[123px] h-[100px] relative group">
                <video
                  controls
                  className="h-[100px]"
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #ccc", // Add this line to apply a border
                  }}
                >
                  <source
                    src={`${data?.data.propertyVideo} || "https://www.w3schools.com/html/mov_bbb.mp4"`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {data?.data?.propertyImages?.map((item, index) => {
                return (
                  <div
                    className="w-[123px] h-[100px] relative group"
                    key={index}
                    onClick={() => setSliderIndex(index)}
                  >
                    <Image
                      alt="image"
                      src={item}
                      height={100}
                      width={320}
                      style={{ borderRadius: 8 }}
                      className={`w-full h-full object-cover ${
                        index === sliderIndex
                          ? "border border-[#00809E] border-opacity-[50%]"
                          : "border border-transparent"
                      }`}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative order-1 lg:order-2 bg-[#F3F3F3] p-2 rounded-lg">
          {/* host info */}

          <div className="flex items-center justify-between border border-[#E0E0E0] bg-white rounded-3xl h-[50px] px-2 mb-2">
            <div className="flex items-center gap-2 ">
              <Image
                alt="property"
                src={data?.data.createdBy.avatar as string}
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
              <p className="text-[#767676] text-[18px] leading-7 font-medium">
                {data?.data.createdBy.fullName}
              </p>
            </div>
            <div
              onClick={() => setOpen(true)}
              className="w-10 cursor-pointer h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center"
            >
              <MdOutlineArrowOutward size={24} color="#00809E" />
            </div>
          </div>

          <div className="bg-white p-2 rounded-lg mb-2">
            <div className="h-[200px] w-full">
              <ReactMapGL
                {...viewport}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                mapboxAccessToken="pk.eyJ1Ijoib2huYWRpciIsImEiOiJjbGYzbXB2cG4wcjNsM3FuZGkyeXgzaGp3In0.UW7J5lIaWc-P3nXa2WmRxQ"
                mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                <Marker
                  latitude={viewport.latitude}
                  longitude={viewport.longitude}
                >
                  <Image src={marker} alt="marker" width={30} height={30} />
                </Marker>
              </ReactMapGL>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <TfiLocationPin size={22} color="#5C5C5C" />
              <p className="text-base text-sm  leading-[21px] font-normal">
                {data?.data?.location?.address}
              </p>
            </div>
          </div>

          <div className="w-full h-[50px]  flex items-center justify-between border border-[#E0E0E0] bg-white rounded-3xl px-5 mb-2">
            <p className="text-base text-[16px] leading-5 font-medium">
              Category:
            </p>
            <p className="text-[#333333] text-[16px] capitalize leading-5 font-medium">
              {data?.data.category?.replace(/-/g, " ") || "General"}
            </p>
          </div>

          <div className="w-full h-[50px] flex items-center justify-between border border-[#E0E0E0] bg-white rounded-3xl px-5 mb-2">
            <p className="text-base text-[16px] leading-5 font-medium">
              Price :
            </p>
            <p className="text-[#333333] text-[16px] leading-5 font-medium">
              <h1 className="text-primary font-semibold text-[24px] leading-5">
                ${data?.data.price}
                <sub className="font-normal">/{data?.data.priceType}</sub>
              </h1>
            </p>
          </div>

          {/* select date */}
          <div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#00809E",
                  colorTextPlaceholder: "#838383",
                },
              }}
            >
              <DatePicker.RangePicker
                size={"large"}
                style={{
                  width: "100%",
                  borderRadius: 24,
                  height: 50,
                  border: "1px solid #d9d9d9d9",
                }}
              />
            </ConfigProvider>
          </div>
          <button
            onClick={() => setOpenPayment(true)}
            className="w-full mt-3 h-[56px] text-center text-white bg-primary rounded-3xl px-5 mb-2"
          >
            Book Now
          </button>
        </div>
      </div>

      {/*  */}
      <div className="rounded-lg bg-[#F3F3F3] p-6 mt-6 ">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
            <Heading
              name="About"
              style="font-normal text-[24px] mb-4 leading-[36px] text-[#333333]"
            />
            <p className="text-[#767676] text-[16px] leading-6 font-normal">
              {data?.data.description}
            </p>

            <div className="grid lg:grid-cols-2 grid-cols-1 text-base mt-6">
              <div className="">
                <div className="flex items-center justify-between">
                  <span className="w-full">Size</span>
                  <span className="w-full">:</span>
                  <span className="w-full"> {data?.data.size}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Decorated</span>
                  <span className="w-full">:</span>
                  <span className="w-full capitalize">
                    {data?.data.decorationType}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Property type</span>
                  <span className="w-full">: </span>
                  <span className="w-full capitalize">
                    {data?.data.propertyType}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Bed type</span>
                  <span className="w-full">: </span>
                  <span className="w-full capitalize">
                    {data?.data.bedType}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Bedrooms</span>
                  <span className="w-full">: </span>
                  <span className="w-full capitalize">
                    {data?.data.bedrooms}
                  </span>
                </div>
              </div>

              <div className="lg:mt-0 mt-2">
                <div className="flex items-center justify-between">
                  <span className="w-full">Bathrooms</span>
                  <span className="w-full">: </span>
                  <span className="w-full capitalize">
                    {data?.data.bathrooms}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Balcony</span>
                  <span className="w-full">: </span>
                  <span className="w-full capitalize">
                    {data?.data.balcony}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Kitchen</span>
                  <span className="w-full">: </span>
                  <span className="w-full capitalize">
                    {data?.data.kitchen}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Dining</span>
                  <span className="w-full">:</span>
                  <span className="w-full capitalize">{data?.data.dining}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="w-full">Drawing</span>
                  <span className="w-full">: </span>
                  <span className="w-full capitalize">
                    {data?.data.drawing}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 order-1 lg:order-2">
            <Calender unavailableDay={data?.data.unavailableDay!} />
          </div>
        </div>

        <div className="col-span-12 mt-6 flex lg:flex-row flex-col lg:items-center lg:gap-10 gap-3 ">
          <p className="text-[#5C5C5C] leading-6 font-medium text-[16px]">
            Move on :{" "}
            <span className="text-[#00B047]">
              {data?.data?.moveOn
                ? new Date(data.data.moveOn).toLocaleDateString("en-US")
                : "N/A"}
            </span>
          </p>
          <p className="text-[#5C5C5C] leading-6 font-medium text-[16px]">
            Gender :
            <span className="text-[#00B047] capitalize">
              {" "}
              {data?.data.allowedGender}
            </span>
          </p>
          <p className="text-[#5C5C5C] leading-6 font-medium text-[16px]">
            Guest type :
            <span className="text-[#00B047] capitalize">
              {" "}
              {data?.data.guestType}
            </span>
          </p>
          <p className="text-[#5C5C5C] leading-6 font-medium text-[16px]">
            Occupation :{" "}
            <span className="text-[#00B047] capitalize">
              {data?.data.occupation}
            </span>
          </p>
        </div>

        {/* facilities */}
        <div className="mt-6">
          <Heading
            name="Facilities"
            style="font-normal text-[24px] mb-4 leading-[36px] text-[#333333]"
          />
          <div className="flex flex-wrap lg:flex-row  lg:items-center gap-4">
            {data?.data.facilities.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#FFDFD4] gap-2 text-[#333333] capitalize rounded-3xl w-fit px-3 h-[40px] flex items-center justify-center"
                >
                  {/* <Wifi size={24} color="#333333" /> */}
                  <Image height={24} width={24} src={item.icon} alt="icon" />
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <HostProfile
        open={open}
        setOpen={setOpen}
        id={data?.data.createdBy._id as string}
      />
      <PaymentCard setOpen={setOpenPayment} open={openPayment} />
    </div>
  );
};

export default DetailsClient;
