"use client";
import Heading from "@/components/shared/Heading";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import "slick-carousel/slick/slick.css";
import Calender from "@/components/Calender";
import HostProfile from "@/components/HostProfile";
import PaymentCard from "@/components/Card/PaymentCard";
import { Button, ConfigProvider, DatePicker, Form } from "antd";
import { useGetSinglePropertyQuery } from "@/redux/features/web/api/propertyApi";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import moment from "moment";
import { setToLocalStorage } from "@/util/localStorage";
import { useCreateIntentMutation } from "@/redux/apiSlices/Stripe";
import { imageUrl } from "@/redux/api/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Sliders from "./Sliders";
import Swal from "sweetalert2";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { Calendar } from "antd";

const stripePromise = loadStripe(
  "pk_test_51Px61B09PaAtuvTu86yiPwNUSlQkHD7v9gCkEfmi5c1TBzGM2tWE2ikiLSj74vySrkf0x2K2pRUO5LK8gRjZFIi700BhubFldh"
);

const DetailsClient = ({ id }: { id: string }) => {
  const { data } = useGetSinglePropertyQuery(id);
  const [checkDate, setCheckDate] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<any>();
  const [createIntent] = useCreateIntentMutation();
  const [open, setOpen] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15,
  });

  useEffect(() => {
    const coordinates = data?.data?.location?.coordinates;
    if (coordinates?.length === 2) {
      setViewport((prev) => ({
        ...prev,
        latitude: coordinates[1],
        longitude: coordinates[0],
      }));
    }
  }, [data?.data?.location?.coordinates]);

  const onchangeData = (value: any) => {
    const checkingDate = moment(value).format("d-MM-yyyy");
    setToLocalStorage("checkInDate", checkingDate);
    setCheckDate(checkingDate);
  };

  // book now
  const handleBooking = async (values: any) => {
    const data = {
      propertyId: id,
    };
    //console.log(data);
    await createIntent(data).then((res) => {
      if (res?.data?.success) {
        const token = res?.data?.data;
        setClientSecret(token);
        setOpenPayment(true);
      } else {
        Swal.fire({
          //@ts-ignore
          text: res?.error?.data?.message,
          icon: "error",
        });
      }
    });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBnGMvBf21Petlmxsdv9UpGydeker8V2JA",
  });

  const [openPayment, setOpenPayment] = useState(false);

  const disabledDate = (date: Dayjs): boolean => {
    return data?.data?.unavailableDay?.some((d: any) =>
      dayjs(date).isSame(dayjs(d), "day")
    );
  };

  return (
    <div className="container pt-6 mb-8">
      <Link href={"/"}>
        <div className="w-[91px] h-[31px] rounded-[90px] flex  items-center justify-center gap-1 bg-[#F7F7F7] text-base">
          <MoveLeft size={18} color="#5C5C5C" />
          Back
        </div>
      </Link>

      <Heading
        name={`Looking for a room in ${data?.data?.address
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
          <Sliders data={data} />
        </div>

        <div className="col-span-12 lg:col-span-5 relative order-1 lg:order-2 bg-[#F3F3F3] p-2 rounded-lg">
          {/* host info */}

          <div className="flex items-center justify-between border border-[#E0E0E0] bg-white rounded-3xl h-[50px] px-2 mb-2">
            <div className="flex items-center gap-2 ">
              <Image
                alt="property"
                src={
                  data?.data?.createdBy?.avatar?.startsWith("https")
                    ? data?.data?.createdBy?.avatar
                    : `${imageUrl}${data?.data?.createdBy?.avatar}`
                }
                width={30}
                height={30}
                style={{ width: "30px", height: "30px", borderRadius: "100%" }}
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
              {isLoaded ? (
                <GoogleMap
                  center={{ lat: viewport.latitude, lng: viewport.longitude }}
                  zoom={10}
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                  }}
                >
                  <Marker
                    position={{
                      lat: viewport.latitude,
                      lng: viewport.longitude,
                    }}
                    icon={{
                      url: "/marker.png",
                      scaledSize: new google.maps.Size(25, 30),
                    }}
                  />
                </GoogleMap>
              ) : (
                <div>Loading map...</div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <TfiLocationPin size={22} color="#5C5C5C" />
              <p className="text-base text-sm  leading-[21px] font-normal">
                {data?.data?.address}
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
                €{data?.data.price}
                <sub className="font-normal">/{data?.data.priceType}</sub>
              </h1>
            </p>
          </div>

          <Form onFinish={handleBooking}>
            <Form.Item name="checkingDate">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#00809E",
                    colorTextPlaceholder: "#838383",
                  },
                }}
              >
                <DatePicker
                  size={"large"}
                  onChange={onchangeData}
                  disabledDate={disabledDate}
                  placeholder="For booking, please enter your checking date"
                  style={{
                    width: "100%",
                    borderRadius: 24,
                    height: 50,
                    border: "1px solid #d9d9d9d9",
                  }}
                />
              </ConfigProvider>
            </Form.Item>

            <Form.Item name="checkoutDate">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#00809E",
                    colorTextPlaceholder: "#838383",
                  },
                }}
              >
                <DatePicker
                  size={"large"}
                  placeholder="Please Select your checkout Date"
                  style={{
                    width: "100%",
                    borderRadius: 24,
                    height: 50,
                    border: "1px solid #d9d9d9d9",
                  }}
                />
              </ConfigProvider>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                disabled={checkDate === null || undefined}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  height: "56px",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#00809e",
                  borderRadius: "24px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginBottom: "8px",
                }}
              >
                Book Now
              </Button>
            </Form.Item>
          </Form>
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
            <div className=" text-end  px-3 flex items-center  gap-4">
              <p className=" flex items-center  gap-1 py-2 ">
                <span className=" w-4 h-4 rounded-full bg-red-600"></span>{" "}
                <span className=" font-medium text-gray-500">Unavailable</span>
              </p>
            </div>
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
            {data?.data?.facilities?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-[#FFDFD4] gap-2 text-[#333333] capitalize rounded-3xl w-fit px-3 h-[40px] flex items-center justify-center"
                >
                  {/* <Wifi size={24} color="#333333" /> */}
                  <Image
                    height={24}
                    width={24}
                    src={`${imageUrl}${item.icon}`}
                    alt="icon"
                  />
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
      <Elements stripe={stripePromise}>
        <PaymentCard
          setOpen={setOpenPayment}
          open={openPayment}
          clientSecret={clientSecret}
          id={id}
        />
      </Elements>
    </div>
  );
};

export default DetailsClient;
