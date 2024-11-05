"use client";
import React, { useEffect } from 'react';
import Accommodation from '@/components/Home/Accommodation';
import Banner from '@/components/Home/Banner';
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Location from '@/components/Home/Location';
import Amenities from '@/components/Amenities';
import SummeryCount from '@/components/Home/SummeryCount';
import Review from '@/components/Home/Review';
import Feature from '@/components/Home/Feature';

const HomeClient = () => {
  return (
    <div>
      <Feature/>
      <Banner/>
      <Accommodation/>
      <Location/>
      <Amenities/>
      <SummeryCount/>
      <Review/>
    </div>
  )
}

export default HomeClient