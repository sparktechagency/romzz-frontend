"use client";
import React, { useState } from 'react';
import Modal from './shared/Modal';
import { Button, Checkbox, ConfigProvider, Form, Input, Select } from 'antd';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { TiArrowSortedDown } from 'react-icons/ti';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface IFilterProps{
    open: boolean;
    setOpen: (open: boolean)=>void;
}


const Filter:React.FC<IFilterProps> = ({open, setOpen}) => {
    const [tab, setTab] = useState("Room mate");
    const [form] = Form.useForm();
    form.getFieldsValue();
    const [price, setPrice] = useState([0, 5000]);

    const facilitiesOptions = [
        { label: "Wi-Fi", value: "wifi" },
        { label: "Baño privado", value: "baño_privado" },
        { label: "Linnen ( pillow, bed sheets, towel)", value: "linnen" },
        { label: "AC", value: "ac" },
        { label: "Parking", value: "parking" },
        { label: "Pet allowed", value: "pet-allowed" },
        { label: "Heater", value: "Heater" },
    ];

    const ratingOptions = [
        { label: "Amazing 😊", value: "5" },
        { label: "Very Good 😊", value: "4" },
        { label: "Good 😊", value: "3" },
        { label: "OK 😊", value: "1" }
    ];

    const distanceOptions = [
        { label: "Less than 1km", value: "1" },
        { label: "Less than 3km", value: "3" },
        { label: "Less than 5km", value: "5" },
    ];

    const handleSubmit=(values:any)=>{
        console.log(values)
    }

    const handleReload=()=>{
        form.resetFields();
    }


    const body =(
        <div className=''>
            <div className="mt-2 border-b-[1px] border-[#C0C0C0] pb-4">
                <ul className="flex flex-wrap items-center gap-6">
                    {
                        ["Room mate", "Flat mate"].map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`
                                        font-normal w-fit  h-10 text-center 
                                        px-5
                                        flex items-center justify-center 
                                        text-[16px] leading-6
                                        ${
                                        item === tab
                                            ? "bg-white text-[#00809E] border border-primary transition-all duration-200"
                                            : "bg-[#F3F3F3] text-[#767676] border border-transparent"
                                        }
                                        rounded-3xl cursor-pointer
                                    `}
                                    onClick={() => setTab(item)}
                                >
                                    {item}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <Form 
                onFinish={handleSubmit} 
                layout='vertical' 
                className='h-[650px] flex flex-col  mt-4'
                form={form}
            >
                <div className='grid grid-cols-12 gap-6 flex-1 overflow-y-auto p-3 pl-1 custom-scrollbar-container'>
                    <Form.Item
                        name={"location"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Location</p>}
                        style={{marginBottom: 0}}
                        className='col-span-6'
                    >
                        <Input
                            suffix={
                                <div className='w-10 cursor-pointer h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <FaMapLocationDot size={24} color='#00809E' />
                                </div>
                            }
                            prefix={<IoLocationOutline size={24} color='#5C5C5C' />}
                            style={{
                                width: "100%",
                                background: "#FEFEFE",
                                border: "1px solid #E0E0E0",
                                borderRadius: 24,
                                outline: "none",
                                boxShadow: "none",
                                padding: "4px 4px 4px 11px"
                            }}
                            placeholder='Search your destination'
                            className='flex-1 placeholder:text-[#767676] placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[14px]'
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name={"property-type"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Property Type</p>}
                        className='col-span-6'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Property Area</p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">Sydney</Select.Option>
                            <Select.Option value="Melbourne">Melbourne</Select.Option>
                            <Select.Option value="Brisbane">Brisbane</Select.Option>
                            <Select.Option value="Adelaide">Adelaide</Select.Option>
                            <Select.Option value="Hobart">Hobart</Select.Option>
                            <Select.Option value="Perth">Perth</Select.Option>
                        </Select>
                    </Form.Item>

                    <div className='col-span-12 priceSlider px-2'>
                        <Form.Item
                            name={"price"}
                            id="price"
                            label={
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-[16px] leading-6 text-[#636363]">Price</p>
                                    <p className="text-primary flex items-center gap-2">
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                colorPrimary: "#838383",
                                                colorTextPlaceholder: "#838383",
                                                colorText: "#00809e",
                                                },
                                                components: {
                                                Input: {
                                                    hoverBorderColor: "#d9d9d9",
                                                    activeShadow: "none",
                                                    activeBorderColor: "#00809e",
                                                },
                                                },
                                            }}
                                        >
                                            <Input
                                                prefix={<p className="text-primary font-semibold">$</p>}
                                                value={price[0]}
                                                style={{ width: 120 }}
                                                onChange={(e) => {
                                                    const newValue = parseInt(e.target.value) || 0;
                                                    const newPrice = [Math.min(newValue, price[1]), price[1]];
                                                    setPrice(newPrice);
                                                }}
                                                className="font-semibold"
                                            />
                                        </ConfigProvider>
                                            <span className="text-primary font-semibold">-</span>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                colorPrimary: "#838383",
                                                colorTextPlaceholder: "#838383",
                                                colorText: "#00809e",
                                                },
                                                components: {
                                                Input: {
                                                    hoverBorderColor: "#d9d9d9",
                                                    activeShadow: "none",
                                                    activeBorderColor: "#00809e",
                                                },
                                                },
                                            }}
                                        >
                                            <Input
                                                prefix={<p className="text-primary font-semibold">$</p>}
                                                value={price[1]}
                                                style={{ width: 120 }}
                                                onChange={(e) => {
                                                    const newValue = parseInt(e.target.value) || 0;
                                                    const newPrice = [price[0], Math.max(newValue, price[0])]; // Ensure it doesn't go below the lower value
                                                    setPrice(newPrice);
                                                }}
                                                className="font-semibold"
                                            />
                                        </ConfigProvider>
                                    </p>
                                </div>
                            }
                            style={{ marginBottom: 0 }}
                        >
                            <Slider
                                range
                                min={0}
                                max={5000}
                                value={price}
                                className="custom-slider"
                                trackStyle={{ backgroundColor: "#00809E", height: 10 }}
                                handleStyle={{
                                borderColor: "#00809E",
                                height: 20,
                                width: 20,
                                opacity: 1,
                                backgroundColor: "#00809E",
                                }}
                                onChange={(value:any) => setPrice(value)}
                                railStyle={{ backgroundColor: "#FF9773", height: 10 }}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name={"bed-type"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Bed Type</p>}
                        className='col-span-6'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Select Bed Type </p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">Sofa</Select.Option>
                            <Select.Option value="Sydney">Sofa Bed</Select.Option>
                            <Select.Option value="Sydney">Single Bed</Select.Option>
                            <Select.Option value="Melbourne">Double Bed</Select.Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name={"importance"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Sort By</p>}
                        className='col-span-6'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Filter</p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Melbourne">Rent (Low to high)</Select.Option>
                            <Select.Option value="Melbourne">Rent ( High to low)</Select.Option>
                            <Select.Option value="Melbourne">Featured First</Select.Option>
                            <Select.Option value="Melbourne">Newest Listings</Select.Option>
                            <Select.Option value="Melbourne">Earliest Available</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    

                    <Form.Item
                        name={"decorated"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Decorated</p>}
                        className='col-span-6'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Select Decorated Option</p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">Furnished</Select.Option>
                            <Select.Option value="Melbourne">unFurnished</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        name={"property-type"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Property Type</p>}
                        className='col-span-6'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Property Area</p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">Sydney</Select.Option>
                            <Select.Option value="Melbourne">Melbourne</Select.Option>
                            <Select.Option value="Brisbane">Brisbane</Select.Option>
                            <Select.Option value="Adelaide">Adelaide</Select.Option>
                            <Select.Option value="Hobart">Hobart</Select.Option>
                            <Select.Option value="Perth">Perth</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name={"price-type"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Price Type</p>}
                        className='col-span-6'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Select Price Type </p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">Daily</Select.Option>
                            <Select.Option value="Sydney">Weekly</Select.Option>
                            <Select.Option value="Melbourne">Monthly</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        name={"gender"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Gender</p>}
                        className='col-span-6'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Select Gender</p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">Male</Select.Option>
                            <Select.Option value="Melbourne">Female</Select.Option>
                            <Select.Option value="Melbourne">Others</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name={"occupation"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Occupation</p>}
                        className='col-span-12'
                        style={{marginBottom: 0}}
                    >
                        <Select
                            placeholder={<p className='text-base text-[16px] leading-6 font-normal'>Select Occupation</p>}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 24,
                                insetInlineEnd: 4,
                                padding: "0px 6px 0px 0px"
                            }}
                            
                            suffixIcon={
                                <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                    <TiArrowSortedDown size={24} color='#00809E' />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">All</Select.Option>
                            <Select.Option value="Melbourne">Student</Select.Option>
                            <Select.Option value="Melbourne">Professional</Select.Option>
                        </Select>
                    </Form.Item>

                   
                    {/* facilities */}
                    <Form.Item
                        name={"sortBy"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Facilities</p>}
                        className='col-span-12'
                        style={{marginBottom: 0}}
                    >
                        <Checkbox.Group className="style-checkbox flex items-center flex-wrap">
                            {
                                facilitiesOptions.map((option) => (
                                    <Checkbox
                                        key={option.value}
                                        value={option.value}
                                        style={{
                                            background: "#F3F3F3",
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: 8,
                                            padding: "0 12px",
                                            borderRadius: "8px",
                                            color: "red",
                                        }}
                                        className="flex text-primary items-center justify-center rounded-xl"
                                    >
                                        <p className="text-[#333333] font-medium text-[14px] leading-6">
                                            {option.label}
                                        </p>
                                    </Checkbox>
                                ))
                            }
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                        name={"rating"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">Rating</p>}
                        className='col-span-12'
                        style={{marginBottom: 0}}
                    >
                        <div className='col-span-12 flex items-center gap-4'>
                            {
                                ratingOptions?.map((option) => (
                                    <Checkbox
                                        key={option.value}
                                        value={option.value}
                                        style={{
                                            background: "#F3F3F3",
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: 8,
                                            padding: "0 12px",
                                            borderRadius: "8px",
                                            color: "red",
                                        }}
                                        className="flex text-primary items-center justify-center rounded-xl"
                                    >
                                        <p className="text-[#333333] font-medium text-[14px] leading-6">
                                            {option.label}
                                        </p>
                                    </Checkbox>
                                ))
                            }
                        </div>
                    </Form.Item>

                    <Form.Item
                        name={"distance"}
                        label={<p className="font-medium text-[16px] leading-6 text-[#636363]">DISTANCE CBD (city centre)</p>}
                        className='col-span-12'
                        style={{marginBottom: 0}}
                    >
                        <div className='col-span-12 flex items-center gap-4'>
                            {
                                distanceOptions?.map((option) => (
                                    <Checkbox
                                        key={option.value}
                                        value={option.value}
                                        style={{
                                            background: "#F3F3F3",
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: 8,
                                            padding: "0 12px",
                                            borderRadius: "8px",
                                            color: "red",
                                        }}
                                        className="flex text-primary items-center justify-center rounded-xl"
                                    >
                                        <p className="text-[#333333] font-medium text-[14px] leading-6">
                                            {option.label}
                                        </p>
                                    </Checkbox>
                                ))
                            }
                        </div>
                    </Form.Item>
                </div>

                <div className='flex items-center justify-between pt-4 border-t-[1px] border-[#C0C0C0]'>
                    <Checkbox>Do You Remember this Filter?</Checkbox>
                    <div className='flex items-center gap-2'>
                        <Button 
                            htmlType='button'
                            onClick={handleReload}
                            style={{
                                width: 102,
                                height: 40,
                                background: "#FAFAFA",
                                color: "#767676",
                                border: "none",
                                borderRadius: 24,
                                outline: "none",
                                boxShadow: "none",
                                fontWeight: 700,
                            }}
                        >
                            Reload
                        </Button>

                        <Form.Item
                            style={{marginBottom: 0}}
                            className=''
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
                                    fontWeight: 700,
                                }}
                            >
                                Apply
                            </Button>
                        </Form.Item>
                    </div>

                    
                </div>
            </Form>

        </div>
    )
    return (
        <Modal
            title='Filter Property'
            open={open}
            setOpen={setOpen}
            body={body}
            width={754}
        />
    )
}

export default Filter