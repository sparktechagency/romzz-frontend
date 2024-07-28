"use client";
import Heading from "@/components/shared/Heading";
import Modal from "@/components/shared/Modal";
import React, { useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { SlBadge } from "react-icons/sl";

const SubscriptionClient = () => {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const packages = [
    {
      name: "Regular",
      price: 10,
      details: ["3 Post", "6 Months Validity", "Rules", "Rules"],
    },
    {
      name: "Standard",
      price: 20,
      details: ["6 Post", "6 Months Validity", "Rules", "Rules"],
    },
    {
      name: "Premium",
      price: 20,
      details: ["6 Post", "12 Months Validity", "Rules", "Rules"],
    },
  ];

  const body = (
    <div>
      <div className="flex lg:flex-row flex-wrap items-center lg:justify-between justify-center gap-3">
        {packages?.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundImage:
                  index === 1 ? `url('/premium.png')` : `url('/regular.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "container",
                borderRadius: 8,
              }}
              className="border border-gray-400 border-opacity-[50%] p-5 lg:w-[300px] w-[200px] lg:h-[465px] h-full"
            >
              <p className="lg:text-5xl text-3xl">
                <SlBadge color={`${index === 1 ? "#FDD990" : "#333333"}`} />
              </p>

              <p
                className={` ${
                  index === 1 ? "text-[#FEFEFE]" : "text-[#333333]"
                } lg:text-[24px] text-[20px] lg:leading-[36px] leading-[20px] font-semibold mt-[12px] lg:mt-[25px]`}
              >
                {item.name}
              </p>
              <p
                className={`${
                  index === 1 ? "text-[#FF9773]" : "text-primary"
                } text-[14px] lg:leading-5 leading-[10px] font-semibold lg:mb-6 mb-2`}
              >
                Package
              </p>

              <h1
                className={` ${
                  index === 1 ? "text-[#FEFEFE]" : "text-[#333333]"
                }  font-semibold lg:text-[40px] text-[24px] lg:leading-[60px] leading-7`}
              >
                $100/<sub className="font-normal">pw</sub>
              </h1>

              <div className="flex items-center justify-center lg:my-6 my-2">
                <button
                  className={`
                                            ${
                                              index === 1
                                                ? "text-[#FEFEFE] bg-[#FF9773]"
                                                : "bg-primary text-[#FAFAFA]"
                                            }
                                            
                                            rounded-3xl mx-auto w-fit px-4 lg:h-10 h-full lg:text-[14px] text-[12px] lg:leading-6 leading-4 lg:font-bold font-semibold lg:py-0 py-1 
                                        `}
                >
                  Buy {item.name} Subscription
                </button>
              </div>

              <ul className="grid grid-cols-1 gap-2">
                {item.details.map((details, key) => {
                  return (
                    <li
                      key={key}
                      className={`list-disc list-inside lg:text-[16px] text-[12px] lg:leading-6 leading-4 font-normal text-[#5C5C5C] ${
                        index === 1 ? "text-[#F3F3F3]" : "text-[#5C5C5C]"
                      }`}
                    >
                      {details}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );

  const detailsBody = (
    <div>
      <div
        style={{
          backgroundImage: `url('/regular.png')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "container",
          borderRadius: 8,
        }}
        className="border border-gray-400 border-opacity-[50%] p-5 lg:w-[300px] w-full lg:h-[465px] h-full"
      >
        <p className="lg:text-5xl text-3xl">
          {" "}
          <SlBadge color={`#333333`} />{" "}
        </p>
        <p
          className={` text-[#333333] lg:text-[24px] text-[22px] lg:leading-[36px]  font-semibold lg:mt-[25px] mt-2`}
        >
          {"Regular"}
        </p>
        <p
          className={`text-primary text-[14px] leading-5 font-semibold lg:mb-6 mb-2`}
        >
          Package
        </p>

        <h1
          className={` text-[#333333]  font-semibold lg:text-[40px] text-[22px] lg:leading-[60px] leading-4`}
        >
          $100/<sub className="font-normal">pw</sub>
        </h1>

        <p className="text-[#FF9773] lg:my-4  my-2 lg:text-[24px] text-[20px] leading-6 font-normal">
          Deadline : 30/12/2024
        </p>

        <ul className="grid grid-cols-1 gap-2">
          {["3 Post", "6 Months Validity", "Rules", "Rules"].map(
            (details, key) => {
              return (
                <li
                  key={key}
                  className={`list-disc list-inside lg:text-[16px] text-[12px] lg:leading-6 leading-4 font-normal text-[#5C5C5C] "text-[#5C5C5C]"`}
                >
                  {details}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          name="Booking History"
          style="font-normal lg:text-[24px] text:[22px] leading-[36px] text-[#151515]"
        />
        <button
          onClick={() => setOpen(true)}
          className="bg-primary rounded-3xl  lg:w-[144px] w-1/3  lg:h-10 h-9  lg:text-[14px] text-[12px] leading-6 font-bold text-[#FAFAFA]"
        >
          Buy Subscription
        </button>
      </div>

      <table className="w-full rounded-[5px] mt-3  ">
        <tr className="text-left w-full bg-[#FFDFD4] ">
          {[
            "S.N. ",
            "Package name",
            "Dateline",
            "Package Post",
            "Completed Post",
            "Action",
          ].map((item, index) => (
            <th
              key={index}
              className={` lg:text-[16px] text-[12px] lg:text-center text-start py-2 lg:leading-6 leading-3 text-[#000000]`}
            >
              {item}
            </th>
          ))}
        </tr>

        <tbody className="bg-white">
          {[...Array(2)]?.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                  {index + 1}
                </td>
                <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                  Regular
                </td>
                <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                  30/12/2024
                </td>
                <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                  4
                </td>
                <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                  1
                </td>
                <td className="h-[50px] lg:text-[16px] text-[12px] flex items-center justify-center leading-5 text-[#636363] font-normal">
                  <IoIosInformationCircle
                    className="cursor-pointer"
                    onClick={() => setDetailsOpen(true)}
                    size={24}
                    color="#25B7D3"
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Modal
        title="Subscription Packages"
        open={open}
        setOpen={setOpen}
        body={body}
        width={1000}
      />

      <Modal
        title="Subscription Packages Details"
        open={detailsOpen}
        setOpen={setDetailsOpen}
        body={detailsBody}
        width={350}
      />
    </div>
  );
};

export default SubscriptionClient;
