"use client";
import React, { ReactNode, useContext, useState } from 'react';

interface UserContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);
export const useUser= ()=>{
    return useContext(UserContext)
}

export const UserProvider = ({children}: {children: ReactNode})=>{
    const [user, setUser] = useState(null);
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}