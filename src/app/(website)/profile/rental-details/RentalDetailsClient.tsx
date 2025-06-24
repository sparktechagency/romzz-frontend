"use client";
import HostRentCard from "@/components/Card/HostRentCard";
import PropertyVerification from "@/components/Profile/PropertyVerification";
import RentPost from "@/components/Profile/RentPost";
import Heading from "@/components/shared/Heading";
import Modal from "@/components/shared/Modal";
import { useGetProfileQuery } from "@/redux/apiSlices/AuthSlices";
import {
  useGetAllPostQuery,
  useRetrievedSubscriptionQuery,
} from "@/redux/apiSlices/ClientProfileSlices";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const RentalDetailsClient = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rentData, setRentData] = useState({});
  const [updateInfo, setUpdateInfo] = useState({});
  const { data: profileInfo } = useGetProfileQuery(undefined);
  const profileId = profileInfo?.data?._id;
  const type = "all";
  const { data: allPost, refetch } = useGetAllPostQuery({
    id: profileId,
    type: type,
    page: page,
  });
  const AllPostData = allPost?.data?.data;
  const [openRentModal, setOpenRentModal] = useState(false);
  const searchParams = useSearchParams();
  const params = searchParams.get("status");

  useEffect(() => {
    if (params === "true") {
      setOpen(true);
    }
  }, [params]);

  const { data: subscription } = useRetrievedSubscriptionQuery(undefined);

  console.log();

  return (
    <div>
      {/* heading */}
      <div className="flex items-center justify-between">
        <Heading
          name="Rental Details"
          style="font-normal lg:text-[24px] text-[20px] lg:leading-[36px]  leading-6 text-[#151515]"
        />
        <div className="flex items-center gap-6">
          {(!profileInfo?.data?.isSubscribed &&
            allPost?.data?.data?.length > 0) ||
          subscription?.data?.packageId?.limitation && Number(subscription?.data?.packageId?.limitation) ===  allPost?.data?.data?.length
          ? 
          <button
              className="bg-primary rounded-3xl w-fit px-5 h-10 text-[14px] leading-6 font-bold text-[#FAFAFA]"
            >
            Upgrade Plan
            </button> 
          : (
            <button
              onClick={() => setOpen(true)}
              className="bg-primary rounded-3xl w-[110px] h-10 text-[14px] leading-6 font-bold text-[#FAFAFA]"
            >
              New Post
            </button>
          )}
        </div>
      </div>

      {/* property post */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {AllPostData?.map((property: any, index: number) => {
          return (
            <div key={index} className="bg-white p-2 rounded-lg">
              <HostRentCard
                setOpenRentModal={setOpenRentModal}
                openRentModal={openRentModal}
                open={open}
                setOpen={setOpen}
                property={property}
                setUpdateInfo={setUpdateInfo}
                refetchAllPost={refetch}
              />
            </div>
          );
        })}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center mt-6">
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          total={allPost?.data?.meta?.total}
        />
      </div>

      <Modal
        title="Property Verification"
        open={open}
        setOpen={setOpen}
        body={
          <PropertyVerification
            open={open}
            setOpen={setOpen}
            openRentModal={openRentModal}
            setRentData={setRentData}
            setOpenRentModal={setOpenRentModal}
          />
        }
        width={852}
      />

      <Modal
        title="Property New Post"
        open={openRentModal}
        setOpen={setOpenRentModal}
        body={
          <RentPost
            open={openRentModal}
            setOpen={setOpenRentModal}
            rentData={rentData}
            updateInfo={updateInfo}
            refetchAllPost={refetch}
          />
        }
        width={852}
      />
    </div>
  );
};

export default RentalDetailsClient;
