"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MoveLeft, Search, SlidersHorizontal } from "lucide-react";
import Heading from "@/components/shared/Heading";
import { Input, notification, Select, Tooltip } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiLocationPin } from "react-icons/tfi";
import { useGetApprovePropertiesQuery } from "@/redux/features/web/api/propertyApi";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import LocationCard from "./LocationCard";
import { imageUrl } from "@/redux/api/api";
import Filter from "@/components/Filter";

const SearchFilter = () => {
  const [search, setSearch] = useState();
  const [area, setArea] = useState();
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const { data } = useGetApprovePropertiesQuery({ search, area, filter });
  const properties = data?.data;
  console.log(properties);

  const handleMarkerClick = (index: number) => {
    if (activeMarker === index) {
      setActiveMarker(null);
    } else {
      setActiveMarker(index);
    }
  };

  //  search location
  const handleLocation = (e: any) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  //  select area
  const handleSelectLocation = (value: any) => {
    setArea(value);
  };

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 3,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBnGMvBf21Petlmxsdv9UpGydeker8V2JA",
  });

  const [map, setMap] = useState(null);

  const onLoad = (map: any) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport((prev) => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    });
  }, []);

  return (
    <div className="container lg:h-[calc(100vh-96px)] h-full py-6">
      <div className="rounded-lg grid lg:grid-cols-12 grid-cols-1 h-full border border-base border-opacity-[10%]">
        {/* Sidebar */}
        <div className="col-span-4 bg-[#F9F9F9] p-2 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href={"/"}>
              <div className="w-[91px] h-[31px] rounded-[90px] flex items-center justify-center gap-1 bg-[#F3F3F3] text-base">
                <MoveLeft size={18} color="#5C5C5C" />
                Back
              </div>
            </Link>

            <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E]">
              <span className="text-primary">Romzz</span> Map
            </Heading>
          </div>

          {/* Search and Filters */}
          <div className=" flex items-center gap-2">

            <Input
              onChange={(e) => handleLocation(e)}
              style={{
                width: "100%",
                height: 40,
                background: "transparent",
                outline: "none",
                boxShadow: "none",
                border: "1px solid #d9d9d9",
              }}
              placeholder="Search your destination"
            />

            <div
              onClick={() => setOpen(true)}
              className="flex items-center justify-center rounded h-10 w-[100px] bg-primary  gap-3 cursor-pointer"
            >
              <SlidersHorizontal size={16} color="white" />
              <p className="text-white">Filter</p>
            </div>


          </div>

          {/* Properties List */}
          <div className="flex-1 overflow-y-auto mt-1">
            {properties?.map((item, index) => (
              <LocationCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="lg:col-span-8 col-span-12 w-full lg:h-full h-[400px] overflow-hidden p-3">
          {isLoaded ? (
            <GoogleMap
              center={{ lat: viewport.latitude, lng: viewport.longitude }}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
            >
              {properties?.map((item: any, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: item?.location?.coordinates[1],
                      lng: item?.location?.coordinates[0],
                    }}
                    icon={{
                      url: "/marker.png",
                      scaledSize: new google.maps.Size(25, 30),
                    }}
                    onClick={() => handleMarkerClick(index)}
                  >
                    {activeMarker === index && (
                      <div className="  ">
                        <InfoWindow
                          position={{
                            lat: item?.location?.coordinates[1],
                            lng: item?.location?.coordinates[0],
                          }}
                          onCloseClick={() => setActiveMarker(null)}
                        >
                          <div
                            className="grid grid-cols-12 "
                            style={{ width: 350, borderRadius: "10px" }}
                          >
                            {/* Left Column with Image */}
                            <div className="col-span-6">
                              <Image
                                src={`${imageUrl}${item?.propertyImages[0]}`} // Ensure the image path is valid
                                alt={"ïmage"}
                                width={100}
                                height={100}
                                style={{ borderRadius: 8, objectFit: "cover" }}
                              />
                            </div>

                            {/* Right Column with Details */}
                            <div className="col-span-6">
                              <h1 className="text-primary font-semibold text-[15px] my-1">
                                €{item?.price}
                                <sub>
                                  {item?.priceType === "day"
                                    ? `/pd`
                                    : item?.priceType === "week"
                                    ? "/pw"
                                    : item?.priceType === "month"
                                    ? "/pm"
                                    : "/py"}
                                </sub>
                              </h1>
                              <p className="py-1 text-[14px] font-semibold ">
                                {item?.category}
                              </p>

                              {/* User and Title */}
                              <div className="flex items-center gap-2">
                                <Image
                                  alt="User Avatar"
                                  src={
                                    item?.createdBy?.avatar?.startsWith("https")
                                      ? item?.createdBy?.avatar
                                      : `${imageUrl}${item?.createdBy?.avatar}`
                                  }
                                  width={20}
                                  height={20}
                                  style={{
                                    borderRadius: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                                <Heading
                                  name={item?.title}
                                  style="font-bold text-[14px] leading-[15px]"
                                />
                              </div>

                              {/* Address */}
                              <p className="text-sm flex gap-2 font-normal py-1">
                                <TfiLocationPin size={14} color="#5C5C5C" />
                                {item?.address}
                              </p>
                            </div>
                          </div>
                        </InfoWindow>
                      </div>
                    )}
                  </Marker>
                );
              })}
            </GoogleMap>
          ) : (
            <div>Loading map...</div>
          )}
        </div>
      </div>
      <Filter open={open} setOpen={setOpen} setFilter={setFilter} />
    </div>
  );
};

export default SearchFilter;
