import React, { useEffect } from "react"
import { ListItem } from "./ListItem"
import { FilesModel } from "../Models/FileModel"
import { getAllFiles } from "../Services/Fetch"

interface ListProps {
    files: FilesModel;
    setFiles: React.Dispatch<React.SetStateAction<FilesModel>>;
}

export const List: React.FC<ListProps> = ({ files, setFiles }): JSX.Element => {
    
    const renderFiles = (): JSX.Element[] => {
        return (
            files.map((file) => {
                return (
                    <div key={file.id}>
                        <ListItem
                            title={file.title}
                            description={file.description}
                            hash={file.hash}
                            originalName={file.originalName}
                        />
                    </div>
                )
            })
        )
    }

    useEffect(() => {
        getAllFiles().then((result) => {
            console.log(result);
            setFiles(result);
        }).catch((error) => {
            console.log(error);
            // TODO: ADD POP UP to inform the fetching of files failed.
        })
    },[])
    
    return (
        <ul className="ListContainer">
            {renderFiles()}
        </ul>
    )
}