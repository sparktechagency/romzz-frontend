"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading from "../shared/Heading";
import { Rate } from "antd";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/apiSlices/AuthSlices";
import { CiEdit } from "react-icons/ci";
import { imageUrl } from "@/redux/api/api";

const Banner = () => {
  // profile
  const [imgFile, setImgFile] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  //  cover image
  const [coverFile, setCoverFile] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const { data, refetch } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const [rating, setRating] = useState<number>(0);

  const userInfo = data?.data;

  useEffect(() => {
    if (data?.data?.rating) {
      setRating(parseInt(data.data.rating));
    }
  }, [data]);

  //   profile
  const onImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgUrl(URL.createObjectURL(file));
    const formData = new FormData();
    //console.log("imgFile",file);
    if (file) {
      formData.append("avatar", file);
    }
    await updateProfile(formData).then((res) => {
      refetch();
      //console.log(res);
    });
  };

  // cover image
  const onCoverImageChange = async (e: any) => {
    const file = e.target?.files[0];
    setCoverFile(file);
    setCoverUrl(URL.createObjectURL(file));

    const formData = new FormData();
    //console.log(file);

    if (file) {
      formData.append("coverImage", file);
    }

    await updateProfile(formData).then((res) => {
      refetch();
      //console.log(res);
    });
  };

  const profileImg = imgUrl
    ? imgUrl
    : userInfo?.avatar?.startsWith("https")
    ? userInfo?.avatar
    : `${imageUrl}${userInfo?.avatar}`;
  const coverImg = coverUrl
    ? coverUrl
    : userInfo?.coverImage?.startsWith("https")
    ? userInfo?.coverImage
    : `${imageUrl}${userInfo?.coverImage}`;

  return (
    <div>
      <div className="relative h-[300px]">
        {/* banner Image   */}
        <div
          style={{
            position: "relative",
            height: "300px",
            width: "100%",
          }}
        >
          <Image
            src={coverImg}
            alt="host-profile"
            fill
            quality={100}
            style={{
              borderRadius: "10px",
            }}
          />

          <label
            htmlFor="imageUploadBanner"
            style={{
              position: "absolute",
              top: 1,
              right: 0,
              backgroundColor: "white",
              width: 35,
              height: 35,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <CiEdit size={25} color="#929394" />
          </label>

          <input
            id="imageUploadBanner"
            type="file"
            src=""
            onChange={onCoverImageChange}
            style={{ display: "none" }}
            alt=""
          />
        </div>

        <div className="lg:w-[430px] w-[80%] absolute left-0 top-1/2 transform -translate-y-1/2 border-2 p-1 rounded-r-[90px] bg-[#E6F2F5] bg-opacity-[80%]">
          <div className="flex items-center gap-6">
            {/* profile Image  */}
            <div
              style={{
                position: "relative",
              }}
            >
              <Image
                src={profileImg}
                alt="host-profile"
                width={120}
                height={120}
                className="border-2 rounded-full p-1 border-primary"
                unoptimized
              />

              <label
                htmlFor="imageUpload"
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: -10,
                  backgroundColor: "white",
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <CiEdit size={25} color="#929394" />
              </label>

              <input
                id="imageUpload"
                type="file"
                src=""
                onChange={(e) => onImageChange(e)}
                style={{ display: "none" }}
                alt=""
              />
            </div>

            <div>
              <Heading
                name={userInfo?.fullName}
                style="font-semibold text-[24px] leading-[36px] text-[#333333]"
              />
              <Rate disabled defaultValue={rating} />

              <p className="text-[#767676] text-[14px]  leading-6 font-normal">
                {userInfo?.presentAddress}
              </p>
              <p className="text-[#767676] text-[14px]  leading-6 font-normal">
                {userInfo?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
