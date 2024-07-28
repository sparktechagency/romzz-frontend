import React, { useEffect, useState } from 'react';
import Heading from '../shared/Heading';
import Image from 'next/image';
import map from "@/assets/map.png";
import ReactMapGL, { Marker } from "react-map-gl";
import marker from "@/assets/marker.png";
import 'mapbox-gl/dist/mapbox-gl.css';

const Location = () => {
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 8
    });

    const handleViewportChange = (event:any) => {
        const { viewState } = event;
        setViewport(viewState);
    };

    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    const handleGetLocation=()=>{
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
    }
    
    return (
        <div className='container grid grid-cols-12 pb-20'>
            <div className='col-span-12 lg:col-span-6 order-2 lg:order-1 flex items-center justify-center'>
                <div>
                    <Heading style="font-normal text-[40px] leading-[50px] text-[#151515]">
                        Map with your <br />
                        <span className="text-primary">Location</span>
                    </Heading>
                    <p className='text-[20px] mt-[18px] leading-[30px] font-semibold text-[#5C5C5C]'>
                        Collaborate with your <span className='text-secondary cursor-pointer' onClick={handleGetLocation}>location</span> to <br />
                        get accurate map features.
                    </p>
                </div>
            </div>

            <div 
                className="col-span-12 lg:col-span-6 h-full lg:h-[440px] rounded-[25px] relative order-1 lg:order-2 bg-white p-3"
                style={{
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                }}
            >
                <ReactMapGL
                    {...viewport}
                    style={{width: "100%", height: "100%", borderRadius: 20}}
                    mapboxAccessToken="pk.eyJ1Ijoib2huYWRpciIsImEiOiJjbGYzbXB2cG4wcjNsM3FuZGkyeXgzaGp3In0.UW7J5lIaWc-P3nXa2WmRxQ"
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    onMove={handleViewportChange}
                >
                    <Marker
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                    >
                        <Image
                            src={marker}
                            alt='marker'
                            width={30}
                            height={30}
                        />
                  </Marker>   
                </ReactMapGL>
            </div>
        </div>
    )
}

export default Location;