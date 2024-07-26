import React from 'react';
import { Modal as AntModal } from "antd";

interface IModalProps{
    title: string,
    open: boolean;
    setOpen:( open: boolean )=> void;
    body: React.ReactElement;
    width?: number;
}

const Modal:React.FC<IModalProps> = ({title, open, setOpen, width, body}) => {
    const handleClose=()=>{
        setOpen(false)
    }
    return (
        <AntModal
            title={title}
            footer={false}
            open={open}
            onCancel={handleClose}
            width={width || 400}
        >
            {body}
        </AntModal>
    )
}

export default Modal