import React from "react"
import { getFile } from "../Services/Fetch"

interface ListItemHeaderProps {
    title: string;
    description: string;
    hash: string;
    originalName: string;
}


export const ListItemHeader: React.FC<ListItemHeaderProps> = ({title, description, hash, originalName}): JSX.Element => {
    
    const downloadFile = (hash: string, originalName: string) => {
        return () => {
            getFile(hash, originalName);
        }
    }
    
    return (
        <div className="ListItemHeader">
            <div>
                <h2>
                    {title}
                </h2>
            </div>
            <div>
                {description}
            </div>
            <div>
                <button onClick={downloadFile(hash, originalName)}>
                    Download
                </button>
                <div>
                    {originalName}
                </div>
            </div>
        </div>
    )
}