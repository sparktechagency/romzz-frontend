import React from "react";
import Modal from "./shared/Modal";
import Image from "next/image";
import Heading from "./shared/Heading";
import { Rate } from "antd";
import person from "@/assets/person2.png";
import Meeting from "@/assets/meet.png";
import { Wifi } from "lucide-react";
import { imageUrl } from "@/redux/api/api";

interface IClientProfileProps {
  open: any;
  setOpen: (open: boolean) => void;
  value?: any;
}

const ClientProfile: React.FC<IClientProfileProps> = ({
  open,
  setOpen,
  value,
}) => {
  const body = (
    <div>
      <div className="">
        <Image
          src={ open?.userId?.avatar?.startsWith("https") ? open?.userId?.avatar : `${Image}${open?.userId?.avatar}` }
          alt="host-profile"
          width={90}
          height={90}
          style={{ objectFit: "contain", clipPath: "circle()", margin: "0 auto" }}
        />
        <Heading
          name={open?.userId?.fullName}
          style="font-normal mt-2 text-[18px] text-center leading-[20px] text-[#333333]"
        />
        <div className="flex items-center justify-center my-3">
          <Rate defaultValue={open?.rating} allowHalf />
        </div>
        <p className="text-[#767676] text-center text-[15px] mb-6 leading-5 font-normal">
        {open?.feedback}
        </p>

        {
          open?.image
          &&
          <Image
            src={`${imageUrl}${open?.image}`}
            alt="host-profile"
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
          />
        }
        

        {/* facilities */}
        <div className="mt-6">
          <Heading
            name="Facilities"
            style="font-normal text-[24px] mb-4 leading-[36px] text-[#333333]"
          />
          <div className="flex lg:flex-row flex-wrap items-center gap-4">
            {open?.facilities?.map((item:any, index:number) => {
              return (
                <div
                  key={index}
                  className="bg-[#FFDFD4] gap-2 text-[#333333] rounded-3xl w-fit px-3 h-[40px] flex items-center justify-center"
                >

                  <Image
                    src={`${imageUrl}${item?.icon}`}
                    alt="host-profile"
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                  />
                  {item?.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Modal
        title="Client Details"
        open={open}
        setOpen={setOpen}
        body={body}
        width={600}
      />
    </div>
  );
};

export default ClientProfile;
