
import React from 'react';

const AuthLayout  = ({children}: {children : React.ReactNode}) => {
    return (
        <div 
            className='flex items-center justify-center'
            style={{
                width: "100%",
                height: "100vh",
                backgroundImage: `url('/banner.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "container",
            }}
        >
            <div className='bg-[#FEFEFE] bg-opacity-[90%] rounded-[16px] p-[50px] w-[600px]'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;