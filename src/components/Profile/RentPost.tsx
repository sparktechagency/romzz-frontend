"use client";
import { Button, Checkbox, DatePicker, Form, Input, Select, Upload } from 'antd';
import { CalendarDays, ChevronDown, DollarSign, Eye, FilePlus } from 'lucide-react';
import React, { useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";


interface IRentPostProps{
    open: boolean;
    setOpen: (open:boolean)=> void;
}

const RentPost:React.FC<IRentPostProps> = ({setOpen}) => {
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    
    const handleSwitch=(values:any)=>{
        setOpen(false)
        form.resetFields()
        setFileList([])
    };

    const facilitiesOptions = [
        { label: 'Relation with owner', value: 'relation_with_owner' },
        { label: 'Wi-Fi', value: 'wifi' },
        { label: 'Location', value: 'location' },
        { label: 'Comfortable', value: 'comfortable' },
    ];
    return (
        <Form form={form} onFinish={handleSwitch} layout='vertical' className='h-[650px] flex flex-col '>

            <div className='flex-1 overflow-y-auto custom-scrollbar-container pr-3'>
                <div className=' grid overflow-y-auto grid-cols-12 gap-6'>

                {/* property name */}
                <Form.Item
                    name="property_image"
                    valuePropName="property_image"
                    getValueFromEvent={(e) => e &&  setFileList(e.fileList)}
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Property Image </p>}
                    rules={[
                        {
                            required: true,
                            validator: () => {
                                if (fileList?.length ===0) {
                                return Promise.reject("Please Upload Property Images");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-12'
                >
                    <Upload
                        multiple 
                        maxCount={12}
                        listType="picture-card"
                        fileList={fileList}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </Form.Item>

                {/* property name */}
                <Form.Item
                    name="property_name"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Property Name</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Property Name!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Property Name'
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

                {/* property location */}
                <Form.Item
                    name="address"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Address</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Property Address!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        suffix={
                            <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                <FaMapLocationDot size={24} color='#00809E' />
                            </div>
                        }
                        placeholder='Enter Property Address'
                        style={{
                            width: "100%",
                            height: 48,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE",
                            padding: "4px 4px 4px 11px"
                        }}
                        className=' placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6'
                    />
                </Form.Item>


                {/* category */}
                <Form.Item
                    name="category"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Category</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Property Category"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <Select
                        placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Property Category</p>}
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
                        <Select.Option value="male">Room Mate</Select.Option>
                        <Select.Option value="female">Flate Mate</Select.Option>
                        <Select.Option value="female">Whole Unit</Select.Option>
                    </Select>
                </Form.Item>

                {/* property price */}
                <Form.Item
                    name="price"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Price</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Property Price!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Property Price!'
                        prefix={<DollarSign size={24} color='#A1A1A1' />}
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

                {/* price type */}
                <Form.Item
                    name="price_type"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Price Type</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Property Price Type"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-12 customSelect'
                >
                    <Select
                        placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Price Type</p>}
                        
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
                        <Select.Option value="male">Per Week</Select.Option>
                        <Select.Option value="male">Per Month</Select.Option>
                        <Select.Option value="female">Per Year</Select.Option>
                    </Select>
                </Form.Item>

                {/* property description */}
                <Form.Item
                    name="description"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>About Accommodation</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Property Details!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-12'
                >
                    <Input.TextArea
                        placeholder='Enter Property Details!'
                        style={{
                            width: "100%",
                            height: 150,
                            resize:"none",
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 8,
                            background: "#FEFEFE"
                        }}
                        className=' placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6'
                    />
                </Form.Item>

                {/* size */}
                <Form.Item
                    name="size"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Size</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Property Size!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Property Size'
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

                {/* property decorated */}
                <Form.Item
                    name="decorated"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Decorated</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Property Decoration"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <Select
                        placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Property Decoration</p>}
                        
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
                        <Select.Option value="male">Furnished</Select.Option>
                    </Select>
                </Form.Item>

                {/* floor */}
                <Form.Item
                    name="Floor"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Floor</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Floor number!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Floor number!'
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

                {/* property type */}
                <Form.Item
                    name="property_type"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>property_type</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Property Type"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <Select
                        placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Property Type</p>}
                        
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
                        <Select.Option value="male">Furnished</Select.Option>
                    </Select>
                </Form.Item>
                
                {/* bed type */}
                <Form.Item
                    name=""
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
                
                {/* bed rooms */}
                <Form.Item
                    name="bedrooms"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Bedrooms</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Bedrooms number!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Bedrooms number'
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
                
                {/* bathroom */}
                <Form.Item
                    name=""
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Bathroom</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Bathroom number!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Bathroom number'
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
                
                {/* balcony */}
                <Form.Item
                    name=""
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Balcony</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Balcony number!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Balcony number!'
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
                
                {/* Kitchen */}
                <Form.Item
                    name=""
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Kitchen</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Kitchen number!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Kitchen number!'
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
                
                {/* Dining */}
                <Form.Item
                    name=""
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Dining</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Dining!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Dining '
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
                
                
                {/* drawing room */}
                <Form.Item
                    name=""
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Drawing</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Drawing"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-12'
                >
                    <Input
                        placeholder='Enter Drawing'
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
                
                {/* entry date */}
                <Form.Item
                    name="move"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Move on</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Move on Date"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <DatePicker
                        suffixIcon={
                            <div
                                style={{
                                    background: "#E6F2F5",
                                    width: 40,
                                    height: 40,
                                    borderRadius: "100%",
                                    display: "flex",
                                    alignItems:"center",
                                    justifyContent: "center",
                                }}
                            >
                                <CalendarDays className='cursor-pointer' color='#00809E' size={24} /> 
                                
                            </div>
                        }
                        placeholder="Select Move on Date"
                        style={{
                            width: "100%",
                            height: 48,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE",
                            padding: "4px 4px 4px 11px",
                            
                        }}
                    />
                </Form.Item>
                
                {/* leave date */}
                <Form.Item
                    name="decorated"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Unavailable Dates</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Property Decoration"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <DatePicker
                        suffixIcon={
                            <div
                                style={{
                                    background: "#E6F2F5",
                                    width: 40,
                                    height: 40,
                                    borderRadius: "100%",
                                    display: "flex",
                                    alignItems:"center",
                                    justifyContent: "center",
                                }}
                            >
                                <CalendarDays className='cursor-pointer' color='#00809E' size={24} /> 
                                
                            </div>
                        }
                        placeholder="Select Move on Date"
                        style={{
                            width: "100%",
                            height: 48,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE",
                            padding: "4px 4px 4px 11px"
                        }}
                    />
                </Form.Item>
                
                {/* allowed gender */}
                <Form.Item
                    name="decorated"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Allowed Gender</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Allowed Gender"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <Select
                        placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Allowed Gender</p>}
                        
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
                        <Select.Option value="male">Furnished</Select.Option>
                    </Select>
                </Form.Item>
                
                {/* guest type */}
                <Form.Item
                    name="decorated"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Guest Type</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Guest Type"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <Select
                        placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Guest Type</p>}
                        
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
                        <Select.Option value="male">All</Select.Option>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="male">Female</Select.Option>
                    </Select>
                </Form.Item>
                
                {/* Occupation */}
                <Form.Item
                    name="Occupation"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Occupation</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Occupation"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-12 customSelect'
                >
                    <Select
                        placeholder={<p className='text-[#818181] text-[16px] font-normal leading-6'>Occupation</p>}
                        
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
                        <Select.Option value="male">All</Select.Option>
                        <Select.Option value="male">Student</Select.Option>
                        <Select.Option value="male">Professional</Select.Option>
                    </Select>
                </Form.Item>
                
                {/* facilities */}
                <Form.Item
                    name={"facilities"}
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Facilities</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Choose Taken Facilities"
                        }
                    ]}
                    className='col-span-12'
                >
                    <Checkbox.Group className='style-checkbox flex items-center flex-wrap'>
                        {
                            facilitiesOptions.map((option) => (
                                <Checkbox
                                    key={option.value}
                                    value={option.value}
                                    style={{
                                        background: '#F3F3F3',
                                        height: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 8,
                                        padding: '0 12px',
                                        borderRadius: '8px',
                                        color: "red"
                                    }}
                                    className="flex text-primary items-center justify-center rounded-xl"
                                >
                                    <p className="text-[#333333] font-medium text-[14px] leading-6">{option.label}</p>
                                </Checkbox>
                            ))
                        }
                    </Checkbox.Group>
                </Form.Item>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-[#767676] text-sm leading-[24px] font-normal'>
                    We will verify your all documents for security purpose,
                    Your post will be published within 24 hours of verification.
                </p>
                <Form.Item
                    style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "end",
                        width: "100%",
                        marginBottom: 0
                    }}
                >
                    <Button
                        htmlType='submit'
                        style={{
                            width: 102,
                            height: 40,
                            background: "#00809E",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: 24,
                            outline: "none",
                            boxShadow: "none",
                            fontWeight: 700
                        }}
                    >
                        New Post
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default RentPost