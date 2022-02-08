export interface FileModel {
    title: string;
    description: string;
    original_name: string;
    hash: string;
    id: string;
}

export type FilesModel = Readonly<FileModel>[];

export interface FileUploadModel {
    title: string;
    description: string;
    file: File;
}