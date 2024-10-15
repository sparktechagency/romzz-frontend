"use client"
import Heading from "@/components/shared/Heading";
import { useGetNotificationQuery, useUpdateMarkAsReadMutation } from "@/redux/features/web/api/notification";
import { Pagination } from "antd";
import moment from "moment";
import React, { useState } from "react";

const NotificationClient = () => {  
  const [page, setPage] = useState(1)
  const {data}= useGetNotificationQuery(page)    

  const [updateMarkAsRead] = useUpdateMarkAsReadMutation()
  const notificationData = data?.data 

  const handleMarkAsRead =async()=>{ 

    await updateMarkAsRead(undefined)

  }
  return (
    <div className="container pt-6 mb-8 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <Heading
          name="Notifications"
          style="font-normal text-[32px] leading-[48px] text-primary"
        />
        <p onClick={()=>handleMarkAsRead()} className="underline text-secondary cursor-pointer">Read All</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
      {
            notificationData?.result?.map((value:any , index:number ) =>  
          <div key={index} className={ ` ${value?.isRead ? "bg-white" : "bg-[#e6f2f5]"  } shadow-lg p-4 rounded-lg    `}  > 
              <div 
          className=" flex  justify-between "
          > 
            <p
              style={{
                display: "flex",
                gap: "40px",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#555555",
                }}
              >
             {value?.message}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#A7A7A7",
                }}
              >
              {moment(value?.createdAt).format('D MMM YYYY , hh:mm a')}
              </span>
            </p> 

     
          </div>
          </div>
            )
          }
      </div> 
      {
          notificationData?.data?.result?.length >= 8 ? <Pagination   align="end"
          defaultCurrent={page} 
          total={notificationData?.data?.meta?.total} 
          onChange={(page)=>setPage(page)} /> 
          : ""
          }
    </div>
  );
};

export default NotificationClient;
