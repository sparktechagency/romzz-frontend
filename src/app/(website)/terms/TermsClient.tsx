"use client"
import Heading from '@/components/shared/Heading';
import { useGetTermQuery } from '@/redux/features/web/api/termsApi';
import React from 'react';

const TermsClient = () => { 
    const {data:terms} = useGetTermQuery(undefined)  
     const termsData = terms?.data[0]?.termsContent
    console.log(termsData); 
    return (
        <div className='pt-10'> 
            <div className=' container'>

             <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] mb-6">
          Terms & <span className="text-primary">Condition</span>
        </Heading>  

        <p dangerouslySetInnerHTML={{ __html: termsData }}></p>

            </div>
        </div>
    );
};

export default TermsClient;