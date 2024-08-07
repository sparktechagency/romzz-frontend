import { Handshake, House, UsersRound } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { FaRegStar } from "react-icons/fa6";

const SummeryCount = () => {
  return (
    <div className="bg-primary lg:h-[193px] h-full flex items-center justify-center lg:py-0 py-3">
      <div className="container flex lg:flex-row flex-col  items-center  text-center lg:justify-between ">
        <div className="flex gap-3 items-center  lg:py-0 py-3 lg:w-full w-[300px] ">
          <UsersRound
            className=" lg:w-[60px] w-[35px] h-[40px] lg:h-[80px] "
            color="rgba(247, 247, 247, 0.5)"
          />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="lg:text-[48px] text-[24px] lg:leading-[62px] leading-[30px] font-normal flex items-center text-[#F7F7F7]">
                  <div ref={countUpRef} />
                  K+
                </div>
              )}
            </CountUp>
            <p className="text-[18px] leading-[23px] font-normal text-[#F7F7F7]">
              ROMZZERS
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center lg:py-0 py-3 lg:w-full w-[300px] ">
          <House
            className=" lg:w-[60px] w-[35px] h-[40px] lg:h-[80px] "
            color="rgba(247, 247, 247, 0.5)"
          />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="lg:text-[48px] text-[24px] lg:leading-[62px] leading-[30px] font-normal flex items-center text-[#F7F7F7]">
                  <div ref={countUpRef} />
                  K+
                </div>
              )}
            </CountUp>
            <p className="text-[18px] leading-[23px] font-normal text-[#F7F7F7]">
              Available rentals
            </p>
          </div>
        </div>

        <div className="flex gap-3 lg:py-0 py-3 lg:w-full w-[300px]">
          <Handshake
            className=" lg:w-[60px] w-[35px] h-[40px] lg:h-[80px] "
            color="rgba(247, 247, 247, 0.5)"
          />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="lg:text-[48px] text-[24px] lg:leading-[62px] leading-[30px] font-normal flex items-center text-[#F7F7F7]">
                  <div ref={countUpRef} />
                  K+
                </div>
              )}
            </CountUp>
            <p className="text-[18px] leading-[23px] font-normal text-[#F7F7F7]">
              Successful Deals
            </p>
          </div>
        </div>

        <div className="flex gap-3  lg:w-full w-[300px] lg:pb-0 pb-3 ">
          <FaRegStar
            className=" lg:w-[60px]  w-[35px] h-[40px] lg:h-[80px] "
            color="rgba(247, 247, 247, 0.5)"
          />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="lg:text-[48px] text-[24px] lg:leading-[62px] leading-[30px] font-normal flex items-center text-[#F7F7F7]">
                  <div ref={countUpRef} />
                  K+
                </div>
              )}
            </CountUp>
            <p className="text-[18px] lg:leading-[23px] leading-3 font-normal text-[#F7F7F7]">
              Customer Satisfactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummeryCount;
