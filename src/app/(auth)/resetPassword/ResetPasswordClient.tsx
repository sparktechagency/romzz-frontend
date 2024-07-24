"use client"
import Heading from '@/components/shared/Heading';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const ResetPasswordClient = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    form.setFieldsValue(undefined);


    const handleSubmit=async(values:any)=>{
        router.push("/login");
        toast.success("Password Reset Successfully")
    }


    return (
        <div>
            <Heading name='Set a new password' style='font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6' />
            <p className='font-normal w-[361px] mx-auto text-center text-[14px] leading-[26px] text-base mb-6' >
                Create a new password. Ensure it differs from previous ones for security
            </p>

            <Form onFinish={handleSubmit} form={form} layout='vertical'>
                
                <Form.Item
                    name="password"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Password</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Password"
                        }
                    ]}
                >
                    <Input.Password
                        placeholder='Enter Password'
                        className='placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6'
                        style={{
                            width: "100%",
                            height: 50,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE"
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="confirm_password"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Confirm Password</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Confirm Password"
                        }
                    ]}
                >
                    <Input.Password
                        placeholder='Enter Confirm Password'
                        className='placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6'
                        style={{
                            width: "100%",
                            height: 50,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE"
                        }}
                    />
                </Form.Item>


                <Form.Item
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    }}
                >
                    <Button 
                        htmlType='submit'
                        style={{
                            width: 150,
                            height: 50,
                            background: "#00809E",
                            color: "#ffffff"
                        }}
                    >
                        {"Reset Password"}
                    </Button>
                </Form.Item>


            </Form>
        </div>
    )
}

export default ResetPasswordClient;