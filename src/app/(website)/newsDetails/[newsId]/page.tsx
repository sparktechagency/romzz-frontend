import React from 'react';
import NewsDetailsClient from '../NewsDetailsClient';

interface IParamsProps{
    params:{
        newsId: string;
    }
}

const page: React.FC<IParamsProps> = ({params: {newsId}}) => {
    return (
        <React.Fragment>
            <NewsDetailsClient id={newsId} />
        </React.Fragment>
    )
}

export default page