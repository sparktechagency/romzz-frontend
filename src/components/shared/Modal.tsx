import React from 'react';
import { Modal as AntModal } from "antd";

interface IModalProps{
    title: string,
    open: boolean;
    setOpen:( open: boolean )=> void;
    body: React.ReactElement;
}

const Modal:React.FC<IModalProps> = ({title, open, setOpen}) => {
    const handleClose=()=>{
        setOpen(false)
    }
    return (
        <AntModal
            title={title}
            footer={false}
            open={open}
            onCancel={handleClose}
        >

        </AntModal>
    )
}

export default Modal