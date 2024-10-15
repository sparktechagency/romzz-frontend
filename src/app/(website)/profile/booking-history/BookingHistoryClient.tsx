"use client"
import RentalCard from '@/components/Card/RentalCard';
import Heading from '@/components/shared/Heading';
import Modal from '@/components/shared/Modal';
import { Button, Checkbox, Form, Input, Pagination, Radio, Upload } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import terrible from "@/assets/teriable.png";
import bad from "@/assets/bad.png";
import good from "@/assets/good.png";
import okay from "@/assets/okay.png";
import amazing from "@/assets/amazing.png";
import { ImagePlus } from 'lucide-react';
import checkbox from 'rc-checkbox';
import { useCreateFeedbackMutation, useGetBookingHistoryQuery, useGetFacilitiesQuery } from '@/redux/apiSlices/ClientProfileSlices';

const BookingHistoryClient = () => { 
    const [page, setPage] = useState(1);
    const {data:bookingHistory} = useGetBookingHistoryQuery(page) 
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("")  
    const [statusIndex , setStatusIndex] =useState<number>() 
    const [propertyId , setPropertyId] = useState(null)
    const [createFeedback] = useCreateFeedbackMutation() 
    
  const {data:facilities}= useGetFacilitiesQuery(undefined)  
  const facilitiesOptions = facilities?.data
    const [form] = Form.useForm(); 
    const bookingHistories = bookingHistory?.data?.data 
    //console.log(bookingHistory);

    

    useEffect(()=>{
        if(status){
            form.setFieldsValue({rating: status})
        }
    }, [status, form])


    const getImageSrc = (index: number) => {
        if (index === 0) return terrible;
        if (index === 1) return bad;
        if (index === 2) return okay;
        if (index === 3) return good;
        if (index === 4) return amazing;
        return '';
    };

 
    const handleSubmit= async(values: any)=>{  
        const formData =  new FormData()
      console.log(propertyId);
        const {rating , image , ...otherValues } = values 
        const newImage = image?.file?.originFileObj 
        const data = {
            rating: statusIndex , 
            propertyId: propertyId , 
            ...otherValues
        }  

        formData.append("data" ,JSON.stringify(data)) 
         if(newImage){
            formData.append("image" , newImage)
         } 

         await createFeedback(formData).then(res=> 
            console.log(res)  
            )

        //console.log(data);
 
    } 

    const body = (
        <div>
            <Form layout='vertical' onFinish={handleSubmit} form={form}>
                <p className='text-secondary text-sm my-2 leading-[18px] font-medium text-center mt-4 mb-7'>Please provide your valuable feedback !</p>

                <Form.Item
                    name={"rating"}
                    rules={[
                        {
                            required: true,
                            validator: () => {
                                if (!status) {
                                  return Promise.reject("Please select a rating");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    className='mb-10'
                >
                    <div className='flex items-center  mx-auto'>
                        {
                            ["Terrible", "Bad", "Okay", "Good", "Amazing"].map((item, index)=>{
                                return(
                                    <div 
                                        key={index}
                                        onClick={()=>{setStatus(item) , setStatusIndex(index+1) }} 
                                        className={`
                                            w-20 cursor-pointer group h-20 flex items-center justify-center flex-col rounded-lg mx-auto
                                            ${status === item ? "bg-primary bg-opacity-[90%] text-[#F3F3F3] transition-all duration-200": "bg-[#F5F5F5]"}
                                        `}
                                    >
                                        <div className='w-8 h-8 relative'>
                                            <Image
                                                alt='emoji'
                                                fill
                                                src={getImageSrc(index)}
                                                className='group-hover:scale-110 transition-all duration-200'
                                            />
                                        </div>
                                        <p className={`text-sm mt-1 leading-[18px] font-normal  ${status === item ? "text-[#F3F3F3] transition-all duration-200" : "text-[#8AC5D2]" }`}>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Form.Item>
                
                
                <Form.Item
                    name={"feedback"}
                    label={<p className='text-[#5C5C5C] text-sm leading-[18px] font-normal'>What are the main reasons for you rating?</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Write Something!"
                        }
                    ]}
                >
                    <Input.TextArea
                        style={{
                            height: 129,
                            border: "1px solid #EBEBEB",
                            background: "#F7F7F7",
                            outline: "none",
                            boxShadow: "none",
                            resize: "none"
                        }}
                        placeholder='Write Feedback'
                    />
                </Form.Item>

                <Form.Item
                    name={"image"}
                    label={<p className='text-[#5C5C5C] text-sm leading-[18px] font-normal'>What are the main reasons for you rating?</p>}
                >
                    <Upload maxCount={1} className="customFile">
                        <div className="border-2 border-[#DDDDDD] cursor-pointer bg-[#F3F3F3] w-[52px] h-[36px] rounded-lg  flex items-center justify-center">
                            <ImagePlus color='#ADADAD' size={24} />
                        </div>
                    </Upload>
                </Form.Item>
         
         {/* facilities */}
         <Form.Item
            name="facilities"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Facilities
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Choose Taken Facilities",
              },
            ]}
            className="col-span-12"
          >
            <Checkbox.Group className="style-checkbox flex items-center flex-wrap">
              {facilitiesOptions?.map((option:any) => (
                <Checkbox
                  key={option?._id}
                  value={option?._id}
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
                    {option.name}
                  </p>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

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
                        htmlType='submit'
                        style={{
                            width: 150,
                            height: 48,
                            background: "#00809E",
                            color: "#ffffff",
                            border: "none",
                            outline: "none",
                            borderRadius: 24,
                            fontWeight: 700
                        }}
                    >
                        {"Submit"}
                    </Button>
                </Form.Item>


            </Form>
        </div>
    )
    return (
        <div>

            {/* heading  */}
            <Heading name="Booking History" style="font-normal text-[24px] leading-[36px] text-[#151515]"/>

            <div className='grid grid-cols-1 gap-6'>
                {
                    bookingHistories?.map((item:any, index:number)=>{
                        return(
                            <div key={index} className='bg-white rounded-lg p-2'>
                                <RentalCard setOpen={setOpen} open={open} item={item} setPropertyId={setPropertyId} />
                            </div>
                        )
                    })
                }
            </div>

            {/* pagination */}
            <div className='flex items-center justify-center mt-6'>
                <Pagination
                    current={page}
                    total={bookingHistory?.data?.meta?.total} 
                    onChange={(page)=>setPage(page)}
                />
            </div>

            <Modal
                title='Give Feedback'
                setOpen={setOpen}
                open={open}
                body={body}
                width={602}
            />

        </div>
    )
}

export default BookingHistoryClient