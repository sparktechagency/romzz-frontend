import React from 'react';
import DetailsClient from '../DetailsClient';
interface IProps{
    params: {
        propertyId: string
    }
}


const page = ({params: {propertyId}} : IProps) => {
    return (
        <React.Fragment>
            <DetailsClient id={propertyId} />
        </React.Fragment>
    )
}

export default page