"use client"
import Heading from '@/components/shared/Heading';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { useForgetPassMutation } from '@/redux/apiSlices/AuthSlices';
import { setToLocalStorage } from '@/util/localStorage';
import Swal from 'sweetalert2';

const ForgotPasswordClient = () => { 
    const [forgetPass] = useForgetPassMutation()
    const [form] = Form.useForm(); 
    form.setFieldsValue(undefined)
    const router = useRouter();

    const handleSubmit=async(values:any)=>{   
      
        const userData = {
            email:values?.email ,
            verificationType:"passwordReset"
        }   

        const data = {email:values?.email} 
        // //console.log(data); 

        await forgetPass(data).then((res)=>{ 
            // //console.log(res);  
            if(res?.data?.success){
                Swal.fire({
                    text: res?.data?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                  }).then(() => {  
                      router.push("/otp-verify");    
                      setToLocalStorage("userData" , JSON.stringify(userData))
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
    
    
    return (
        <React.Fragment>
            <Heading name='Forgot password' style='font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6' />
            <Form onFinish={handleSubmit} form={form} layout='vertical'>

                <Form.Item
                    name="email"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Email</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Email!"
                        }
                    ]}
                >
                    <Input
                        placeholder='Enter Email'
                        style={{
                            width: "100%",
                            height: 48,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE"
                        }}
                        className='poppins placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6'
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
                        {"Send Code"}
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default ForgotPasswordClient