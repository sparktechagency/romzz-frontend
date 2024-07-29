import React, { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import { Button, Form, Input, Select } from 'antd';
import { MdOutlinePayment } from "react-icons/md";
import { BiWorld } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';


interface IPaymentProps{
    open: boolean;
    setOpen: (open: boolean)=> void;
}

const PaymentCard: React.FC<IPaymentProps> = ({setOpen, open}) => {
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");


    useEffect(()=>{
        if(keyword){
            fetch(`https://restcountries.com/v3.1/name/${keyword}?fullText=true`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const countryName = data[0]?.name?.common;
                setName(countryName);
            })
        }
    }, [keyword])



    const body=(
        <div>
            <Form layout='vertical' className='grid grid-cols-12 gap-4'>

                <Form.Item
                    label={<p className='text-base text-[13px] font-medium'>Email</p>}
                    className='col-span-12'
                    style={{marginBottom: 0 }}
                >
                    <Input
                        style={{
                            height: 37,
                            width: "100%"
                        }}
                    />
                </Form.Item>
                
                <div className='col-span-12'>
                    <p className=' text-base mb-2 text-[13px] font-medium'>Card Information</p>
                    <div className=' border border-[#d9d9d9] rounded-lg'>
                        <Form.Item style={{marginBottom: 0 }}>
                            <Input
                                style={{
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none",
                                    height: 37,
                                    width: "100%",
                                    background: "transparent"
                                }}
                                placeholder='1234 1234 1234 1234'
                            />
                        </Form.Item>
                        <div className=' flex items-center w-full border-t-[1px] border-[#d9d9d9]'>
                            <Form.Item
                                style={{marginBottom: 0, width: "100%"}}
                            >
                                <Input
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        boxShadow: "none",
                                        height: 37,
                                        width: "100%",
                                        background: "transparent"
                                    }}
                                    placeholder='MM / YY'
                                />
                            </Form.Item>

                            <Form.Item
                                style={{marginBottom: 0, width: "100%"}}
                            >
                                <div className='border-l-[1px] border-[#d9d9d9]'>
                                    <Input
                                        placeholder='CVV'
                                        suffix={<MdOutlinePayment color='#d9d9d9' size={22} />}
                                        style={{
                                            border: "none",
                                            outline: "none",
                                            boxShadow: "none",
                                            height: 37,
                                            width: "100%",
                                            background: "transparent"
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <Form.Item
                    label={<p className='text-base  text-[13px] font-medium'>Cardholder Name</p>}
                    className='col-span-12'
                    style={{marginBottom: 0 }}
                >
                    <Input
                        style={{
                            border: "1px solid #d9d9d9",
                            outline: "none",
                            boxShadow: "none",
                            height: 37,
                            width: "100%",
                            background: "transparent"
                        }}
                        placeholder='Full Name on'
                    />
                </Form.Item>

                <Form.Item
                    label={<p className='text-base text-[13px] font-medium'>Country Or Region</p>}
                    className='col-span-12'
                    style={{marginBottom: 0 }}
                >
                    <Select
                        suffixIcon={<BiWorld size={22} color='#d9d9d9' />}
                        style={{
                            outline: "none",
                            border: "none",
                            boxShadow: "none",
                            height: 37,
                            borderRadius: 8,
                            width: "100%",
                            background: "transparent"
                        }}
                        dropdownRender={menu => (
                            <div>
                                <Input
                                    prefix={<AiOutlineHome size={22} color='#d9d9d9' />}
                                    style={{
                                        border: "1px solid #d9d9d9",
                                        outline: "none",
                                        boxShadow: "none",
                                        height: 37,
                                        width: "100%",
                                        marginBottom: 4,
                                        background: "transparent"
                                    }}
                                    onChange={(e)=>setKeyword(e.target.value)}
                                    placeholder='Search Country by Correct Name...'
                                />
                                <div>

                                </div>
                                {menu}
                            </div>
                        )}
                    >
                        {
                            name
                            &&
                            <Select.Option value={name} >{name}</Select.Option>
                        }
                    </Select>
                </Form.Item>

                <Form.Item style={{marginBottom: 0}} className='col-span-12'>
                    <Button
                        htmlType="submit"
                        style={{
                        width: "100%",
                        height: 40,
                        background: "#00809E",
                        color: "#ffffff",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        fontWeight: 700,
                        }}
                    >
                        New Post
                    </Button>
                </Form.Item>
                
            </Form>
        </div>
    )
    return (
        <Modal
            title='Pay with card'
            open={open}
            setOpen={setOpen}
            body={body}
        />
    )
}

export default PaymentCard