import axios from 'axios';
import { FileUploadModel } from '../Models/FileModel';

const BACKEND_BASEURL = 'http://localhost:3001'


export const getAllFiles = () => {
    let getAllObjectsEndpoint = `${BACKEND_BASEURL}/objects`
    return axios.get(getAllObjectsEndpoint, {
        responseType: 'json'
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return `[Error retrieving the data]: ${error}`
    })
}


export const getFile = (id: string, title: string) => {
    let getFileEndpoint = `${BACKEND_BASEURL}/getFile/id`
    return axios.get(getFileEndpoint).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const anchor = document.createElement('a');
        anchor.setAttribute('href', url);
        anchor.setAttribute('download', title);
        anchor.click();
        URL.revokeObjectURL(url);
    })
}


export const uploadFile = async (uploadFileObject: FileUploadModel): Promise<void> => {
    let uploadObjectEndpoint = `${BACKEND_BASEURL}/uploadFile`
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }

    console.log(uploadFileObject)
    const formData = new FormData();
    formData.append('title', uploadFileObject.title);
    formData.append('description', uploadFileObject.description);
    formData.append('file', uploadFileObject.file, uploadFileObject.file.name);
    console.log(uploadObjectEndpoint)
    axios.post(uploadObjectEndpoint, formData, config).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error.data);
    })

}