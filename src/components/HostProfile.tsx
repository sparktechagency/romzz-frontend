import React, { useState } from "react";
import Modal from "./shared/Modal";
import person from "@/assets/person2.png";
import Image from "next/image";
import { Rate } from "antd";
import Heading from "./shared/Heading";
import { Eye } from "lucide-react";
import ClientProfile from "./ClientProfile";
import { useGetPropertyHostDetailsQuery } from "@/redux/features/web/api/propertyApi";
import { useGetFeedBackByIdQuery } from "@/redux/features/web/api/feedbackApi";
import { imageUrl } from "@/redux/api/api";

interface IHostProfileProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const HostProfile: React.FC<IHostProfileProps> = ({ id, open, setOpen }) => {
  const { data: hostProfile } = useGetPropertyHostDetailsQuery(id); 
  const { data: feedbacks } = useGetFeedBackByIdQuery(id);

  const [openModal, setOpenModal] = useState<any | null>(null);

  const body = (
    <div className="">
      {/* banner image and profile image section */}
      <div className="relative h-[200px]">
        <Image src={hostProfile?.coverImage.startsWith("https") ? hostProfile?.coverImage : `${imageUrl}${hostProfile?.coverImage}`} alt="host-profile" fill />
        <div className="absolute left-4 -bottom-12 border-2 p-1 rounded-full border-primary">
          <Image
            src={ hostProfile?.avatar.startsWith("https") ? hostProfile?.avatar:  `${imageUrl}${hostProfile?.avatar}`}
            alt="host-profile"
            width={120}
            height={120} 
            style={{width:"120px" , height:"120px" , borderRadius:"100%"}}
           
          />
        </div>
      </div>

      {/* profile details section */}
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 mt-5">
        <div className="col-span-6 mt-16">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[60%]">
              User Name
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[10%]">
              :
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#818181] w-full">
              {hostProfile?.fullName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[60%]">
              Address
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[10%]">
              :
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#818181] w-full">
              {hostProfile?.permanentLocation?.address}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[60%]">
              Rating
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[10%]">
              :
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#818181] w-full">
              <Rate disabled value={hostProfile?.rating} allowHalf />
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[60%]">
              Performance
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[10%]">
              :
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#818181] w-full">
              Good
              {/* need to make dynamic */}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[60%]">
              Total rent
            </span>
            <span className="font-medium text-[16px] leading-6 text-[#636363] w-[10%]">
              :
            </span>

            <span className="font-medium text-[16px] leading-6 text-[#818181] w-full">
              {/* need to make dynamic */}
              14
            </span>
          </div>
        </div>

        <div className="bg-[#EBEBEB] lg:p-6 p-3 rounded-3xl col-span-6">
          <div className="grid grid-cols-1 gap-4">
            {feedbacks?.data?.map((item:any, index:number) => (
              <div
                key={index}
                className="grid lg:grid-cols-4 grid-cols-1 gap-3 bg-[#F7F7F7] lg:rounded-3xl rounded-xl lg:p-3 p-1 "
              >
                <div className=" col-span-1">
                  <Image
                    src={item?.userId?.avatar?.startsWith("https") ? item?.userId?.avatar : `${imageUrl}${item?.userId?.avatar}`}
                    alt="host-profile"
                    width={80}
                    height={80}
                    style={{
                      clipPath: "circle()"
                    }}
                  />
                </div>

                <div className=" col-span-3">
                  <div className="w-full flex items-center justify-between ">
                    <Heading
                      name={item?.userId?.fullName}
                      style="font-normal text-[18px]  leading-[20px] text-[#333333]"
                    />
                    <Eye
                      onClick={() => setOpenModal(item)}
                      size={22}
                      color="#767676"
                      className="cursor-pointer "
                    />
                  </div>
                  <Rate defaultValue={item?.rating} allowHalf />
                  <p className="text-[#767676] text-[15px] leading-5 font-normal">
                  {item?.feedback?.slice(0, 30) + "...."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        title="Host Details"
        open={open}
        setOpen={setOpen}
        body={body}
        width={1000}
      />
      <ClientProfile open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default HostProfile;
