"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Heading from "./shared/Heading";
import { useGetFaqsQuery } from "@/redux/features/web/api/faqApi";
import { TFaq } from "@/types/common";
import NoContent from "./shared/NoContent";

type ContentRef = HTMLDivElement | null;

const Faq = () => {
  const { data: faqs } = useGetFaqsQuery({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<ContentRef[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[openIndex]!.style.maxHeight = `${
        contentRefs.current[openIndex]!.scrollHeight
      }px`;
    }
    contentRefs.current.forEach((ref, index) => {
      if (ref && index !== openIndex) {
        ref.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  return (
    <div
      className=" lg:h-[676px] h-full"
      style={{
        width: "100%",

        backgroundImage: `url('/faq.png')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "container",
      }}
    >
      <div>
        <Heading
          name="Popular Frequently Asked Questions"
          style="font-bold text-[32px] sm:text-[20px] leading-[38px] sm:leading-[46px] text-[#333333] text-center mb-4"
        />
        <div className="container grid grid-cols-1 gap-6">
          <p className="text-[#767676] text-[14px] leading-[18px] text-center">
            <span className="text-primary text-bold text-[14px] leading-[18px]">
              Rom{}
              <span className="text-secondary">zz</span>
            </span>{" "}
            <span className="font-normal">
              prepares and delivers organically sourced, fresh meals to your
              door nationwide. Unlike other meal kit delivery services that need
              preparation and cleaning, our meals are delivered ready to
              consume. Our mission is to make healthy eating easy and enjoyable
              while not sacrificing flavor. Do you have a question regarding our
              shipping service?
            </span>
          </p>
          <>
            {faqs && faqs.length > 0 ? (
              faqs?.map((faq: TFaq, index) => (
                <div
                  key={index}
                  className="overflow-hidden transition-max-height duration-300 ease-in-out rounded-lg bg-white cursor-pointer relative lg:h-[56px] h-[65px]"
                  onClick={() => toggleAccordion(index)}
                  style={{
                    minHeight:
                      openIndex === index
                        ? `${contentRefs.current[index]?.scrollHeight}px`
                        : "50px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                >
                  <div
                    ref={(el) => {
                      if (el) {
                        contentRefs.current[index] = el;
                      }
                    }}
                    className="accordion-content p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] leading-6 font-medium text-[#3E3E3E]">
                        {faq?.question}
                      </p>
                      <MdKeyboardArrowRight
                        color="white"
                        className={`bg-primary border rounded-full lg:text-2xl text-xl transition-all ${
                          openIndex === index ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <div className="text-[16px] leading-6 font-normal text-primary my-5 pb-3">
                      {faq?.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent
                title="No FAQs found"
                desc="Please add faq from admin dashboard"
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Faq;
