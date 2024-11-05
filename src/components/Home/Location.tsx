"use client";
import React, { useEffect, useState } from "react";
import Heading from "../shared/Heading";

import "mapbox-gl/dist/mapbox-gl.css";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useGetApprovePropertiesQuery } from "@/redux/features/web/api/propertyApi";

const Location = () => {
  const { data } = useGetApprovePropertiesQuery({});

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 8,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyBnGMvBf21Petlmxsdv9UpGydeker8V2JA",
  });

  const [map, setMap] = useState(null);

  const onLoad = (map: any) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setViewport((prev) => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    });
  };

  return (
    <div className="container grid grid-cols-12 pb-20">
      <div className="col-span-12 lg:col-span-6 order-2 lg:order-1 flex items-center justify-center">
        <div className="mt-5 lg:mt-0">
          <Heading style="font-normal lg:text-[44px] text-[28px] lg:leading-[50px] leading-[30px] text-[#151515] flex lg:flex-col flex-row gap-2">
            <span>Map with your</span>
            <span className="text-primary">Location</span>
          </Heading>
          <p className="text-[20px] mt-[18px] leading-[30px] font-semibold text-[#5C5C5C]">
            Collaborate with your{" "}
            <span
              className="text-secondary cursor-pointer"
              onClick={handleGetLocation}
            >
              location
            </span>{" "}
            to <br />
            get accurate map features.
          </p>
        </div>
      </div>

      <div
        className="col-span-12 lg:col-span-6 h-[440px] rounded-[25px] relative order-1 lg:order-2 bg-white p-3"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
           {isLoaded ? (
            <GoogleMap
              center={{ lat: viewport.latitude, lng: viewport.longitude }}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "20px" }}
            >
              <Marker 
                  position={{ lat: viewport?.latitude, lng: viewport?.longitude }} 
                  icon={{
                    url: "/marker.png",
                    scaledSize: new google.maps.Size(25, 30), 
                  }}
                />
            </GoogleMap> 
           ) :  (
              <div>Loading map...</div>
            )
            }
      </div>
    </div>
  );
};

export default Location;
