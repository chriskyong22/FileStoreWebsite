import React from "react"
import { ToastType } from "./ToastContainer"

interface ToastProps {
    toastCSS: ToastType;
    message: string;
}

export const Toast: React.FC<ToastProps> = ({ toastCSS, message }): JSX.Element => {
    return (
        <div className={toastCSS}>
            {message}
        </div>
    )
}