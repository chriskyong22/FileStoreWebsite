import React from "react"
import { ListItem } from "./ListItem"
import { FilesModel } from "../Models/FileModel"

interface ListProps {
    setFiles: React.Dispatch<React.SetStateAction<FilesModel>>;
}

export const List: React.FC<ListProps> = ({ setFiles }): JSX.Element => {
    return (
        <ul className="ListContainer">
            <ListItem />
        </ul>
    )
}