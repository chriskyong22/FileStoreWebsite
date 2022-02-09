import React from "react"
import { ListItemHeader } from "./ListItemHeader"
import { ListItemFooter } from "./ListItemFooter"

interface ListItemProps {
    title: string;
    description: string;
    hash: string;
    originalName: string;
}

export const ListItem: React.FC<ListItemProps> = ({title, description, hash, originalName}): JSX.Element => {
    return (
        <li className="ListItemContainer">
            <ListItemHeader
                title={title}
                description={description}
                originalName={originalName}
                hash={hash}
            />
            <ListItemFooter

            />
        </li>
    )
}