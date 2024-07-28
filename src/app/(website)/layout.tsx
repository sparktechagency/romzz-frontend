import Chat from '@/components/Home/Chat';
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react';


const layout = ({children}: {children: React.ReactNode}) => {
    
    return (
        <div className='relative'>
            <Navbar/>
            <Chat/>
            <div className='mt-[96px]'>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default layout