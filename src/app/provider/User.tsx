"use client";
import { socketUrl } from '@/redux/api/api';
import { useGetProfileQuery } from '@/redux/apiSlices/AuthSlices';
import { getFromLocalStorage } from '@/util/localStorage';
import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

interface UserContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>; 
    socket:any
}
 
export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({children}: {children: ReactNode})=>{  
    const token = localStorage.getItem("romzzToken");
    const {data:profile} = useGetProfileQuery(undefined)
    const [user, setUser] = useState(null);  

    console.log(profile)

    
    const socket = useMemo(()=>io(socketUrl ,  { extraHeaders: {
        Authorization: `Bearer ${token}`,
      }}),[token]);

    useEffect(()=>{
      const handleConnection =()=>{
      } 
      socket.on("connect" , handleConnection)  
      return(()=>{
        socket.off("connect" , handleConnection)
      })
    },[socket]) 

    useEffect(()=>{
        if(profile){
            setUser(profile.data)
        }
    },[profile]);

    return(
        <UserContext.Provider value={{ user, setUser , socket }}>
            {children}
        </UserContext.Provider>
    )
}