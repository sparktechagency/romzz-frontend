"use client";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/apiSlices/AuthSlices";
import { Button, Form, Input, Select } from "antd";
import { ChevronDown } from "lucide-react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const UserDetails = () => {
  const [form] = Form.useForm();
  form.setFieldsValue(undefined); 
  const {data , refetch} = useGetProfileQuery(undefined)  
  const [updateProfile] = useUpdateProfileMutation() 
  const userInfo = data?.data   


  useEffect(()=>{ 
  if(userInfo){
  form.setFieldsValue({fullName:userInfo?.fullName , 
    email:userInfo?.email , 
    phoneNumber:userInfo?.phoneNumber , 
    nidNumber:userInfo?.nidNumber , 
    gender:userInfo?.gender , 
    permanentLocation:userInfo?.permanentLocation?.address , 
    ineNumber:userInfo?.ineNumber , 
    presentLocation:userInfo?.presentLocation?.address })
}
  },[userInfo , form ])

  const handleSubmit = async (values: any) => {     
    const {presentLocation , permanentLocation , ...otherValue} = values 
    const newValues ={
      presentLocation:{address:presentLocation} , 
      permanentLocation:{address:permanentLocation} , 
      ...otherValue
    } 
    //console.log(newValues);
    const formData = new FormData() 
    formData.append("data",JSON.stringify(newValues))
    await updateProfile(formData).then(res=>{
      if(res?.data?.success){
        Swal.fire({
            text: res?.data?.message,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          }).then(() => {  
            refetch() 
          });
    }else{
        Swal.fire({       
        //@ts-ignore
            text: res?.error?.data?.message,  
            icon: "error",
          });
    }
    })
  };

  return (
    <div>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        className="grid lg:grid-cols-12 grid-cols-1 gap-6" 
      >
        <Form.Item
          name="fullName"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              User Name
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12"
        >
          <Input
            placeholder="Enter Your Name"
            style={{
              width: "100%",
              height: 48,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }}
            className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              Email
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12"
        >
          <Input
            placeholder="Enter Email"
            style={{
              width: "100%",
              height: 48,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }} 
            readOnly
            className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              Contact No
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12"
        >
          <Input
            placeholder="Enter Contact No"
            style={{
              width: "100%",
              height: 48,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }}
            className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
          />
        </Form.Item>

        <Form.Item
          name="nidNumber"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              NID No
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12"
        >
          <Input
            placeholder="Enter Your NID Number"
            style={{
              width: "100%",
              height: 48,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }}
            className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              Gender
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12 customSelect"
        >
          <Select
            placeholder={
              <p className="text-[#818181] text-[14px] font-normal leading-6">
                Select Your Gender
              </p>
            }
            style={{
              height: 48,
              borderRadius: 24,
            }}
            suffixIcon={
              <div className="lg:w-10 w-6 lg:h-10 h-6 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                <ChevronDown size={24} color="#00809E" />
              </div>
            }
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="ineNumber"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              INE No.
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12"
        >
          <Input
            placeholder="Enter Your INE Number"
            style={{
              width: "100%",
              height: 48,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }}
            className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
          />
        </Form.Item>

        <Form.Item
          name="permanentLocation"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              Permanent Address
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12"
        >
          <Input
            placeholder="Enter Permanent Address"
            className="placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            style={{
              width: "100%",
              height: 48,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }}
          />
        </Form.Item>

        <Form.Item
          name="presentLocation"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              Present Address
            </p>
          }
          style={{ marginBottom: 0 }}
          className="lg:col-span-6 col-span-12"
        >
          <Input
            placeholder="Enter Present Address"
            className="placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            style={{
              width: "100%",
              height: 48,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }}
          />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: 0,
          }}
          className="col-span-12"
        >
          <Button
            htmlType="submit"
            style={{
              width: 150,
              height: 48,
              background: "#00809E",
              color: "#ffffff",
              border: "none",
              outline: "none",
              borderRadius: 24,
              fontWeight: 700,
            }}
          >
            {"Save & Change"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserDetails;
