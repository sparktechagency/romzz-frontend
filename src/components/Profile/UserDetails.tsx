"use client";
import { Button, Form, Input, Select } from "antd";
import { ChevronDown } from "lucide-react";
import React from "react";

const UserDetails = () => {
  const [form] = Form.useForm();
  form.setFieldsValue(undefined);

  const handleSubmit = async (values: any) => {};

  return (
    <div>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        className="grid lg:grid-cols-12 grid-cols-1 gap-6"
      >
        <Form.Item
          name="name"
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
            className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
          />
        </Form.Item>

        <Form.Item
          name="contact"
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
          name="nid"
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
          name="ine_no"
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
          name="permanent_address"
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
          name="present_address"
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
