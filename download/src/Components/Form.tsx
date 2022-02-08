import React, { useState } from "react";
import { fileURLToPath } from "url";
import { FilesModel } from "../Models/FileModel"
import { uploadFile } from "../Services/Fetch";
import { ToastType, ToastContainer } from "./ToastContainer";

interface FormProps {
    setFiles: React.Dispatch<React.SetStateAction<FilesModel>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputTypes {
    title: string,
    description: string,
    file: File | null
}

export const Form: React.FC<FormProps> = ({ setFiles, setOpen }) => {

    const [toast, setToast] = useState<{
        toastType: ToastType,
        message: string,
    } | false>(false)

    const [input, setInput] = useState<InputTypes>({
        title: "",
        description: "",
        file: null 
    })
    
    const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
        if (input.file !== null) {
            uploadFile({
                title: input.title,
                description: input.description,
                file: input.file
            }).then((answer) => {
                console.log(answer);
            })
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInput((oldInput) => {
            return {
                ...oldInput,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;
        setInput((oldInput) => {
            return {
                ...oldInput,
                [e.target.name]: fileList[0]
            }
        })
    };

    const closeForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setOpen(false);
    }


    // export interface FileModel {
    //     title: string;
    //     download_url: string;
    //     description: string;
    //     hash: string;
    //     id: string;
    // }

    return (
        <>
            <div className="FormContainer">
                <input
                    placeholder="Title"
                    name="title"
                    value={input.title}
                    onChange={onChange}
                />
                <input 
                    placeholder="Description"
                    name="description"
                    value={input.description}
                    onChange={onChange}
                />
                <input 
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
                <button 
                    className="FormSubmit"
                    onClick={onSubmit}
                >
                    Upload
                </button>
                <button 
                    className="FormCancel"
                    onClick={closeForm}
                >
                    Close
                </button>
            </div>
            {toast && 
                <ToastContainer
                    toastType={ToastType.success}
                    message={"Successfully uploaded the video."}
                />
            }
        </>

    )
}