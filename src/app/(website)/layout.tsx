import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar/>
            <div className='mt-[96px] container'>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default layout