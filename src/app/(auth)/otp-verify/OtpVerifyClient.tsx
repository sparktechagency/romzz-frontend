"use client";
import Heading from "@/components/shared/Heading";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useResendEmailMutation, useVerifyOtpMutation } from "@/redux/apiSlices/AuthSlices";

import { useParams, useRouter } from "next/navigation";
import { getFromLocalStorage, setToLocalStorage } from "@/util/localStorage";
import Swal from "sweetalert2";

const OtpVerifyClient = () => {
  const [form] = Form.useForm(); 
 const router = useRouter()
  form.setFieldsValue(undefined);   
const userData = getFromLocalStorage("userData") 
const userInfo= userData ? JSON.parse(userData) : null;
  const  [verifyOtp] = useVerifyOtpMutation()  
  const [resendEmail] = useResendEmailMutation()
 
 const handleResend =async()=>{
 const data = {email: userInfo?.email} 
 await resendEmail(data).then(res =>{
  //console.log(res); 
      if(res?.data?.success){
      Swal.fire({
        text: res?.data?.message,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {  
          router.push("/resetPassword");
        });
  }else{
      Swal.fire({   
      //@ts-ignore
          text: res?.error?.data?.message,  
          icon: "error",
        });
  }
 })
 }


  const handleSubmit = async (values: any) => {  
    //console.log(values);  

    const otpValue={
     email: userInfo?.email ,
     verificationType: userInfo?.verificationType , 
     otp:parseInt(values?.otp)
    } 
    //console.log(otpValue); 

    if(userInfo?.verificationType === "emailVerification"){
  await verifyOtp(otpValue).then(res =>{
    if(res?.data?.success){
      Swal.fire({
        text: res?.data?.message,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {  
          router.push("/login");
          form.resetFields()
        });
  }else{
      Swal.fire({   
      //@ts-ignore
          text: res?.error?.data?.message,  
          icon: "error",
        });
  } 
  })
    } else{
      await verifyOtp(otpValue).then(res =>{
        if(res?.data?.success){
          Swal.fire({ 
            text: res?.data?.message,       
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {   
              setToLocalStorage("accessToken" ,res?.data?.data?.accessToken )
              router.push("/resetPassword");
              form.resetFields()
            });
      }else{
          Swal.fire({   
          //@ts-ignore
              text: res?.error?.data?.message,  
              icon: "error",
            });
      } 
      })
    }
    // router.push("/login");
    // toast.success("OTP verify Successfully");
  };

  return (
    <div>
      <Heading
        name="Verification code"
        style="font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6"
      />
      <p className="text-[#818181] lg:w-[386px] w-full text-center mx-auto text-[16px] leading-[25px] font-normal ">
        We sent a reset link to{" "}
        <span className="text-[#636363]">{userInfo?.email}</span> enter 6
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
              message: "Please Enter 6 Digit OTP",
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
            length={6}
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

        <p className="text-[#636363] text-[16px] leading-[21px] font-normal text-center" >
          You have not received the email?{" "}
          <span className="text-primary cursor-pointer font-semibold" onClick={()=>handleResend()} >
            Resend
          </span>
        </p>
      </Form>
    </div>
  );
};

export default OtpVerifyClient;
