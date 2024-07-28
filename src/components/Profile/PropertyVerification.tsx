"use client";
import { Button, Checkbox, Form, Input, Select, Upload } from 'antd';
import { ChevronDown, FilePlus, ImagePlus } from 'lucide-react';
import React, { useState } from 'react'
interface IPropertyVerificationProps{
    open: boolean;
    openRentModal: boolean;
    setOpen: (open:boolean)=> void;
    setOpenRentModal: (open:boolean)=> void;
}

const PropertyVerification:React.FC<IPropertyVerificationProps> = ({setOpen, setOpenRentModal}) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [form] = Form.useForm();
    
    const handleSwitch=(values:any)=>{
        setOpen(false)
        setOpenRentModal(true);
        form.resetFields()
    };

    return (
        <Form form={form} onFinish={handleSwitch} layout='vertical' className='grid grid-cols-12 gap-6'>

            <Form.Item
                name="gender"
                label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Gender</p>}
                rules={[
                    {
                        required: true,
                        message: "Please Select Owner type"
                    }
                ]}
                style={{marginBottom: 0}}
                className='col-span-6 customSelect'
            >
                <Select
                    placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Owner Type</p>}
                    
                    style={{
                        height: 48,
                        borderRadius: 24
                    }}
                    
                    suffixIcon={
                        <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                            <ChevronDown size={24} color='#00809E' />
                        </div>
                    }
                >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="reconfirm_number"
                label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Re-Confirm number</p>}
                rules={[
                    {
                        required: true,
                        message: "Please Enter Re-Confirm number!"
                    }
                ]}
                style={{marginBottom: 0}}
                className='col-span-6'
            >
                <Input
                    placeholder='Give your house owner or  reliable number'
                    style={{
                        width: "100%",
                        height: 48,
                        boxShadow: "none",
                        outline: "none",
                        border: "1px solid #E0E0E0",
                        borderRadius: 24,
                        background: "#FEFEFE"
                    }}
                    className=' placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6'
                />
            </Form.Item>

            <Form.Item
                name="documents"
                valuePropName="documents"
                getValueFromEvent={(e) => e && e.fileList}
                label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Proof of ownership <span className='text-[#E88969] font-normal'>(submit 2 deferent documents)</span> </p>}
                rules={[
                    {
                        required: true,
                        message: "Please Upload Proof of ownership"
                    }
                ]}
                style={{marginBottom: 0}}
                className='col-span-12'
            >
                <Upload
                    maxCount={2}
                >
                    <div className='bg-[#FEFEFE] w-full flex items-center justify-between border border-[#E0E0E0] rounded-3xl h-12 pr-1 px-3'>
                        <p className='font-medium text-[16px] leading-6 text-[#818181]'>Properties document/bills</p>
                        <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                            <FilePlus size={24} color='#00809E' />
                        </div>
                    </div>
                </Upload>
            </Form.Item>
            
            <div className='col-span-12 flex items-center gap-2'>
                <Checkbox onChange={(e:any)=>setChecked(e.target.checked)} /> 
                <p className='font-normal text-[16px] leading-6 text-[#818181]'>For your safety, double-check the information and provide correct information.</p>
            </div>

            <Form.Item
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginBottom: 0
                }}
                className='col-span-12'
            >
                <Button
                    disabled={!checked} 
                    htmlType='submit'
                    style={{
                        width: 150,
                        height: 48,
                        background: "#00809E",
                        color: "#ffffff",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        fontWeight: 700
                    }}
                >
                    Confirm Information
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PropertyVerification;