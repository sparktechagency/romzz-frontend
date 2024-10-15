"use client";
import Heading from "@/components/shared/Heading";
import { useResetPassMutation } from "@/redux/apiSlices/AuthSlices";
import { getFromLocalStorage, setToLocalStorage } from "@/util/localStorage";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ResetPasswordClient = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  form.setFieldsValue(undefined);
  const [resetPass] = useResetPassMutation();
  const userData = getFromLocalStorage("userData");
  const userInfo = userData ? JSON.parse(userData) : null;
  const email = userInfo?.email;
  //console.log(email);

  const handleSubmit = async (values: any) => {
    const data = {
      email: email,
      newPassword: values?.newPassword,
    };
    //console.log(data);
    await resetPass(data).then((res) => {
      //console.log(res);
      if (res?.data?.success) {
        Swal.fire({
          text: res?.data?.message,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          router.push("/");
          form.resetFields();
        });
      } else {
        Swal.fire({
          //@ts-ignore
          text: res?.error?.data?.message,
          icon: "error",
        });
      }
    });

    // router.push("/login");
    // toast.success("Password Reset Successfully")
  };

  return (
    <div>
      <Heading
        name="Set a new password"
        style="font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6"
      />
      <p className="font-normal w-[361px] mx-auto text-center text-[14px] leading-[26px] text-base mb-6">
        Create a new password. Ensure it differs from previous ones for security
      </p>

      <Form onFinish={handleSubmit} form={form} layout="vertical">
        <Form.Item
          name="newPassword"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              Password
            </p>
          }
          rules={[
            {
              required: true,
              message: "Please Enter Password",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            className="placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            style={{
              width: "100%",
              height: 50,
              boxShadow: "none",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: 24,
              background: "#FEFEFE",
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label={
            <p className="font-medium text-[16px] leading-6 text-[#636363]">
              Confirm Password
            </p>
          }
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter Confirm Password"
            className="placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            style={{
              width: "100%",
              height: 50,
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
            {"Reset Password"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordClient;
