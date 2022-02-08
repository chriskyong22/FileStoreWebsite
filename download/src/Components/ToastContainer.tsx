import React, { useEffect, useState } from "react"
import { Toast } from "./Toast"

export enum ToastType{
    success = "Success",
    failure = "Failure",
    warning = "Warning",
    info = "Info",
}

export interface ToastContainerProps {
    toastType: ToastType;
    message: string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toastType, message}): JSX.Element => {

    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }, [])
    
    return (
        <>
            {show && <Toast
                toastCSS={toastType}
                message={message}
            />}  
        </>
    )
}