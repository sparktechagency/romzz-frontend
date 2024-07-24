import React from 'react'

interface IHeadingProps{
    name?: React.ReactNode;
    children?: React.ReactNode;
    style: string;
}

const Heading:React.FC<IHeadingProps> = ({name, style, children}) => {
    return (
        <h1 className={` ${style}`}>{name || children}</h1>
    )
}

export default Heading