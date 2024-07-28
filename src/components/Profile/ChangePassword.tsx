"use client";
import { Button, Form, Input } from "antd";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

const ChangePassword = () => {
  const [form] = Form.useForm();
  form.setFieldsValue(undefined);

  const handleSubmit = async (values: any) => {};
  return (
    <Form
      onFinish={handleSubmit}
      form={form}
      layout="vertical"
      className=" lg:w-[400px] w-full mx-auto"
    >
      <Form.Item
        name="current_password"
        label={
          <p className="font-medium text-[16px] leading-6 text-[#636363]">
            Current Password
          </p>
        }
        rules={[
          {
            required: true,
            message: "Please Enter Current Password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Enter Current Password"
          style={{
            width: "100%",
            height: 48,
            boxShadow: "none",
            background: "#FEFEFE",
            outline: "none",
            border: "1px solid #E0E0E0",
            borderRadius: 24,
            padding: "4px 4px 4px 11px",
          }}
          className="custom-input-password placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-bold placeholder:leading-6"
          iconRender={(visible) => (
            <div
              style={{
                background: "#E6F2F5",
                width: 40,
                height: 40,
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {visible ? (
                <Eye className="cursor-pointer" color="#00809E" size={24} />
              ) : (
                <EyeOff className="cursor-pointer" color="#00809E" size={24} />
              )}
            </div>
          )}
        />
      </Form.Item>

      <Form.Item
        name="new_password"
        label={
          <p className="font-medium text-[16px] leading-6 text-[#636363]">
            New Password
          </p>
        }
        rules={[
          {
            required: true,
            message: "Please Enter New Password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Enter New Password"
          style={{
            width: "100%",
            height: 48,
            boxShadow: "none",
            background: "#FEFEFE",
            outline: "none",
            border: "1px solid #E0E0E0",
            borderRadius: 24,
            padding: "4px 4px 4px 11px",
          }}
          iconRender={(visible) => (
            <div
              style={{
                background: "#E6F2F5",
                width: 40,
                height: 40,
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {visible ? (
                <Eye className="cursor-pointer" color="#00809E" size={24} />
              ) : (
                <EyeOff className="cursor-pointer" color="#00809E" size={24} />
              )}
            </div>
          )}
          className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
        />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        label={
          <p className="font-medium text-[16px] leading-6 text-[#636363]">
            Confirm Password
          </p>
        }
        rules={[
          {
            required: true,
            message: "Please Enter Confirm Password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Enter Confirm Password"
          style={{
            width: "100%",
            height: 48,
            boxShadow: "none",
            background: "#FEFEFE",
            outline: "none",
            border: "1px solid #E0E0E0",
            borderRadius: 24,
            padding: "4px 4px 4px 11px",
          }}
          iconRender={(visible) => (
            <div
              style={{
                background: "#E6F2F5",
                width: 40,
                height: 40,
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {visible ? (
                <Eye className="cursor-pointer" color="#00809E" size={24} />
              ) : (
                <EyeOff className="cursor-pointer" color="#00809E" size={24} />
              )}
            </div>
          )}
          className=" placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6"
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
  );
};

export default ChangePassword;
