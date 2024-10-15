"use client";
import { imageUrl } from '@/redux/api/api';
import React, { useEffect, useRef, useState } from 'react';
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"; 
import Image from 'next/image'; 

const Sliders = ({ data }: { data: any }) => { 
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    const [sliderIndex, setSliderIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null); 
 console.log(`${imageUrl}${data?.data?.propertyVideo}`);
    // Set default video after refresh (or first load)
    useEffect(() => {
        const defaultMedia = `${imageUrl}${data?.data?.propertyVideo}`;
        setSelectedMedia(defaultMedia)
        const storedMedia = localStorage.getItem('selectedMedia');
        if (storedMedia) {
            setSelectedMedia(defaultMedia);
        } 
    }, [data]);

    useEffect(() => {
        if (selectedMedia?.includes('.mp4') && videoRef.current) {
            videoRef.current.muted = true; // Allow autoplay
            videoRef.current.play().catch((error) => console.error("Autoplay error:", error));
        }
        localStorage.setItem('selectedMedia', selectedMedia || '');
    }, [selectedMedia]);

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
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ],
    }; 

    return (
        <div>
            <div className="lg:h-[506px] h-[306px] w-full relative mb-3"> 
                {selectedMedia?.includes('.mp4') ? (
                    <video
                        ref={videoRef}
                       
                        className="w-full h-full"
                        width={500}
                        height={200}
                        style={{ borderRadius: 8 }}
                    >
                        <source src={`${selectedMedia}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <Image
                        src={`${selectedMedia}`}
                        alt="property"
                        className="w-full h-full"
                        width={500}
                        height={200}
                        unoptimized={true} // For external image URLs
                        style={{ borderRadius: 8  , objectFit:"contain"}}
                    />
                )}
            </div>

            <div className=" relative">
                <Slider {...settings}> 
                {data?.data?.propertyVideo && (
            <div
                className="w-[100%] h-[100px] relative group"
                onClick={() => setSelectedMedia(`${imageUrl}${data?.data?.propertyVideo}`)} // Set video source
            >
                <video 
         autoPlay muted 
                    className="h-[100px] w-[175px]"
                    style={{
                        borderRadius: "8px",
                        border:   "2px solid #ccc" ,
                    }} 
                    
                >
                    <source src={`${imageUrl}${data?.data?.propertyVideo}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        )}
                  

                    {data?.data?.propertyImages?.map((item: any, index: number) => (
                        <div
                            className="w-[123px] h-[100px] relative group"
                            key={index}
                            onClick={() => {
                                setSliderIndex(index);
                                setSelectedMedia(`${imageUrl}${item}`);
                            }}
                        >
                            <Image
                                alt="image"
                                src={`${imageUrl}${item}`}
                                height={100}
                                width={320}
                                unoptimized={true}
                                style={{ borderRadius: 8 }}
                                className={`w-full h-full object-cover border border-[#ccc] rounded-sm `}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Sliders;
