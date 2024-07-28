"use client";
import Heading from "@/components/shared/Heading";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const OtpVerifyClient = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  form.setFieldsValue(undefined);

  const handleSubmit = async (values: any) => {
    router.push("/login");
    toast.success("OTP verify Successfully");
  };

  return (
    <div>
      <Heading
        name="Verification code"
        style="font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6"
      />
      <p className="text-[#818181] lg:w-[386px] w-full text-center mx-auto text-[16px] leading-[25px] font-normal ">
        We sent a reset link to{" "}
        <span className="text-[#636363]">contact@dscode...com</span> enter 5
        digit code that mentioned in the email
      </p>

      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        className="mt-6 otp"
      >
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "Please Enter 5 Digit OTP",
            },
          ]}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input.OTP
            length={5}
            style={{
              width: "100%",
              height: 50,
              boxShadow: "none",
              outline: "none",
              background: "transparent",
            }}
            className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
          />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            htmlType="submit"
            style={{
              width: 150,
              height: 50,
              background: "#00809E",
              color: "#ffffff",
            }}
          >
            {"Code Verify"}
          </Button>
        </Form.Item>

        <p className="text-[#636363] text-[16px] leading-[21px] font-normal text-center">
          You have not received the email?{" "}
          <span className="text-primary cursor-pointer font-semibold">
            Resend
          </span>
        </p>
      </Form>
    </div>
  );
};

export default OtpVerifyClient;
