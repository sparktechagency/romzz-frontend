import { useGetProfileQuery } from '@/redux/apiSlices/AuthSlices';
import { useCreateAccountMutation } from '@/redux/apiSlices/Stripe';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const ManageAccount = () => {  
  const router = useRouter() 
  const [createAccount , {isLoading}] = useCreateAccountMutation()
  const {data , refetch} = useGetProfileQuery(undefined)   
  const stripeInfo = data?.stripeAccountInfo?.loginUrl
  //console.log(data); 

  const handleCreateStripe =async()=>{ 
    await createAccount(undefined).then((res)=>{ 
      //console.log(res?.data?.data?.url);
      const url = res?.data?.data?.url;
      if (url) {
        window.open(url, '_blank');
      }
    })

  }
    return (
        <div>

            <div className=' w-full flex flex-col  gap-6  lg:ps-10' > 
              {
                stripeInfo ?   <div className='flex justify-between items-center w-2/3'>
                <p className='text-xl font-medium text-[#5C5C5C]'>Manage Stripe Account</p> 
                <Button
          htmlType="submit"
          style={{
            width: 100,
            height: 40,
            background: "#FF9773",
            color: "#ffffff",
            border: "none",
            outline: "none",
            borderRadius: 24,
            fontWeight: 700,
          }}
        >
          {"Manage"}
        </Button>
                </div>  
                : 

                <div className='flex justify-between items-center w-2/3'>
                <p className='text-xl font-medium text-[#5C5C5C]'>Create Stripe Account</p> 
                <Button 
                onClick={()=>handleCreateStripe()}
          htmlType="submit"
          style={{
            width: 100,
            height: 40,
            background: "#00809E",
            color: "#ffffff",
            border: "none",
            outline: "none",
            borderRadius: 24,
            fontWeight: 700,
          }}
        >
      {isLoading ? "Loading..." : "Create"} 
        </Button>
                </div> 
              }

               

            </div>
        </div>
    );
};

export default ManageAccount;