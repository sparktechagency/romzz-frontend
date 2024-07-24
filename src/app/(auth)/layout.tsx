
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
            <div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;