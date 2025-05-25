"use client";
import PaymentCard from "@/components/Card/PaymentCard";
import Heading from "@/components/shared/Heading";
import Modal from "@/components/shared/Modal";
import { useGetProfileQuery } from "@/redux/apiSlices/AuthSlices";
import {
  useGetAllSubscriptionQuery,
  useGetSubscriptionQuery,
} from "@/redux/apiSlices/ClientProfileSlices";
import { Button } from "antd";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { SlBadge } from "react-icons/sl";

const SubscriptionClient = () => {
  const [open, setOpen] = useState(false);

  const { data: subscriptionPlans } = useGetSubscriptionQuery(undefined);
  const packages = subscriptionPlans?.data;
  const { data: userInfo } = useGetProfileQuery(undefined);
  const userEmail = userInfo?.data?.email;

  // get all subscription
  const { data: allSubscription } = useGetAllSubscriptionQuery(undefined);
  const allSubscriptionData = allSubscription?.data;
  const body = (
    <div>
      <div className="flex lg:flex-row flex-wrap items-center lg:justify-between justify-center gap-3">
        {packages?.map((item: any, index: number) => {
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
                } lg:text-[22px] text-[20px] lg:leading-[36px] leading-[20px] font-semibold mt-[12px] lg:mt-[20px]`}
              >
                {item?.title}
              </p>
              <p
                className={`${
                  index === 1 ? "text-[#FF9773]" : "text-primary"
                } text-[14px] lg:leading-5 leading-[10px] font-semibold lg:mb-6 mb-2`}
              >
                {item.billingCycle} Package
              </p>

              <h1
                className={` ${
                  index === 1 ? "text-[#FEFEFE]" : "text-[#333333]"
                }  font-semibold lg:text-[32px] text-[24px] lg:leading-[60px] leading-4`}
              >
                €{item?.price}/<sub className="font-normal">PM</sub>
              </h1>

              <div className="flex items-center justify-center lg:my-4 my-2">
                <Link
                  href={`${item?.paymentLink}?prefilled_email=${userEmail}`}
                  target="_blank"
                >
                  <button
                    className={`
                                            ${
                                              index === 1
                                                ? "text-[#FEFEFE] bg-[#FF9773]"
                                                : "bg-primary text-[#FAFAFA]"
                                            }
                                            
                                            rounded-3xl mx-auto w-fit px-4 lg:h-10 h-full lg:text-[12px] text-[10px] lg:leading-4 leading-4 lg:font-bold font-semibold lg:py-0 py-1 
                                        `}
                  >
                    Buy {item.title} Subscription
                  </button>
                </Link>
              </div>

              <ul className="grid grid-cols-1 gap-2">
                {item?.features?.map((details: any, key: number) => {
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          name="Subscriptions"
          style="font-normal lg:text-[24px] text:[22px] leading-[36px] text-[#151515]"
        />
        <button
          onClick={() => setOpen(true)}
          className="bg-primary rounded-3xl  lg:w-[144px] w-1/3  lg:h-10 h-9  lg:text-[14px] text-[12px] lg:leading-6 leading-3 font-bold text-[#FAFAFA]"
        >
          Buy Subscription
        </button>
      </div>

      <div className="w-full overflow-x-auto overflow-y-auto">
        <table className="w-full rounded-[5px] mt-3  ">
          <tr className="text-left w-full bg-[#FFDFD4] ">
            {[
              "S.N. ",
              "Package name",
              "Billing Cycle",
              "Package Post",
              "Start Date",
              "End Date",
              // "Action",
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
            {allSubscriptionData?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                    {index + 1}
                  </td>
                  <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                    {item?.packageId?.title}
                  </td>
                  <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                    {item?.packageId?.billingCycle}
                  </td>
                  <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                    {item?.packageId?.limitation}
                  </td>
                  <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                    {moment(item?.currentPeriodStart).format("YYYY-MM-DD")}
                  </td>
                  <td className="h-[50px] text-center lg:text-[16px] text-[12px] leading-6 text-[#767676] font-normal">
                    {moment(item?.currentPeriodEnd).format("YYYY-MM-DD")}
                  </td>

                  {/* <td className="h-[50px] lg:text-[16px] text-[12px] flex items-center justify-center leading-5 text-[#636363] font-normal">
                    <Link
                      href="https://billing.stripe.com/p/login/test_14kaFn8HScL4fvi8ww"
                      target="_blank"
                    >
                      <Button
                        disabled={item?.status !== "active"}
                        style={{
                          backgroundColor: "#00809e",
                          color: "white",
                          fontSize: "12px",
                          padding: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        Manage
                      </Button>
                    </Link>
                  </td> */}
                  
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Subscription Packages"
        open={open}
        setOpen={setOpen}
        body={body}
        width={1000}
      />
    </div>
  );
};

export default SubscriptionClient;
