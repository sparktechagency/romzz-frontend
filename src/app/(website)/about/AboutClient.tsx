import Heading from '@/components/shared/Heading'
import Image from 'next/image'
import React from 'react';
import banner from "@/assets/about.png"
import { LuPhoneCall } from 'react-icons/lu';
import { Mailbox, ShieldCheck } from 'lucide-react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { RiRefund2Line } from "react-icons/ri";
import Amenities from '@/components/Amenities';


const AboutClient = () => {
    return (
        <div className=' pt-10'>
            <div className='container'>
                {/* heading  */}
                <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] mb-6">
                    Our {" "}
                    <span className="text-primary">Story</span>
                </Heading>


                <div className='grid grid-cols-12 gap-6'>
                    <div className='col-span-12 lg:col-span-6 order-2 lg:order-1'>
                        <p className='text-[#5C5C5C] font-normal text-[14px] leading-5'>scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat. eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet non felis, faucibus Praesent id id diam elementum Donec ex venenatis id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin. hendrerit fringilla lacus dui. consectetur venenatis placerat. placerat lacus, at viverra </p>
                        <br />
                        <p className='text-[#5C5C5C] font-normal text-[14px] leading-5'>scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat. eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet non felis, faucibus Praesent id id diam elementum Donec ex venenatis id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin. hendrerit fringilla lacus dui. consectetur venenatis placerat. placerat lacus, at viverra </p>
                    </div>

                    <div className="col-span-12 lg:col-span-6 h-full lg:h-[481px] relative order-1 lg:order-2">
                            <Image
                                alt="Catering"
                                src={banner}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                </div>
            </div>

            {/* contact option */}
            <Amenities/>
        </div>
    )
}

export default AboutClient