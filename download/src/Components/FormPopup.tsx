import React, { useState } from "react"
import { Form } from "./Form"
import { FilesModel } from "../Models/FileModel"
import { ToastContainer, ToastType } from "./ToastContainer"

interface FormPopupProps {
    setFiles: React.Dispatch<React.SetStateAction<FilesModel>>;
}

export const FormPopup: React.FC<FormPopupProps> = ({ setFiles }) => {
    const [open, setOpen] = useState<boolean>(true);

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        setOpen(true);
    }

    return (
        <>
            {!open && 
                <button 
                    className="FormOpenButton"
                    onClick={onClick}
                >
                    Upload
                </button>
            }
            {open && 
                <div className="FormPopup">
                    <Form 
                            setFiles={setFiles}
                            setOpen={setOpen}
                    />
                </div>
            }
            
        </>
    )
}