import { Handshake, House, UsersRound } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { FaRegStar } from "react-icons/fa6";

const SummeryCount = () => {
  return (
    <div className="bg-primary h-[193px] flex items-center justify-center">
      <div className="container flex items-center justify-between">
        <div className="flex gap-3">
          <UsersRound size={56} color="rgba(247, 247, 247, 0.5)" />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="text-[48px] leading-[62px] font-normal flex items-center text-[#F7F7F7]">
                  <div ref={countUpRef} />
                  K+
                </div>
              )}
            </CountUp>
            <p className="text-[18px] leading-[23px] font-normal text-[#F7F7F7]">
              Users
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <House size={56} color="rgba(247, 247, 247, 0.5)" />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="text-[48px] leading-[62px] font-normal flex items-center text-[#F7F7F7]">
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

        <div className="flex gap-3">
          <Handshake size={56} color="rgba(247, 247, 247, 0.5)" />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="text-[48px] leading-[62px] font-normal flex items-center text-[#F7F7F7]">
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

        <div className="flex gap-3">
          <FaRegStar size={56} color="rgba(247, 247, 247, 0.5)" />
          <div>
            <CountUp end={5}>
              {({
                countUpRef,
                start,
              }: {
                countUpRef: any;
                start: () => void;
              }) => (
                <div className="text-[48px] leading-[62px] font-normal flex items-center text-[#F7F7F7]">
                  <div ref={countUpRef} />
                  K+
                </div>
              )}
            </CountUp>
            <p className="text-[18px] leading-[23px] font-normal text-[#F7F7F7]">
              Customer Satisfactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummeryCount;
