import React from 'react';
import Modal from './shared/Modal';
import Image from 'next/image';
import Heading from './shared/Heading';
import { Rate } from 'antd';
import person from "@/assets/person2.png";
import Meeting from "@/assets/meet.png";
import { Wifi } from 'lucide-react';

interface IClientProfileProps{
    open: boolean;
    setOpen: (open:boolean)=> void;
    value?: any;
}

const ClientProfile: React.FC<IClientProfileProps> = ({open, setOpen, value}) => {
    const body = (
        <div>
            <div className=''>
                <Image
                    src={person}
                    alt='host-profile'
                    width={90}
                    height={90}
                    style={{objectFit: "contain", margin: "0 auto"}}
                />
                <Heading name="Aladin" style="font-normal mt-2 text-[18px] text-center leading-[20px] text-[#333333]"/>
                <div className='flex items-center justify-center my-3'>
                    < Rate defaultValue={3.5} allowHalf/>
                </div>
                <p className='text-[#767676] text-center text-[15px] mb-6 leading-5 font-normal'>
                    Literally I didn&apos;t expect but the facilities and the neighbourhood...
                </p>

                <Image
                    src={Meeting}
                    alt='host-profile'
                    width={150}
                    height={150}
                    style={{objectFit: "contain"}}
                />

                {/* facilities */}
                <div className='mt-6'>
                    <Heading name="Facilities" style="font-normal text-[24px] mb-4 leading-[36px] text-[#333333]"/>
                    <div className='flex items-center gap-4'>
                        {
                            [...Array(5)].map((item, index)=>{
                                return(
                                    <div key={index} className='bg-[#FFDFD4] gap-2 text-[#333333] rounded-3xl w-fit px-3 h-[40px] flex items-center justify-center'>
                                        <Wifi size={24} color='#333333' />
                                        {"Wifi"}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
    return (
        <div>
            <Modal
                title='Client Details'
                open={open}
                setOpen={setOpen}
                body={body}
                width={600}
            />
        </div>
    )
}

export default ClientProfile