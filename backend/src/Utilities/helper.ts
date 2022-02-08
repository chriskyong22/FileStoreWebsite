import fs from 'fs'
import crypto from 'crypto'

export const getFileHash = async (filePath: string) => {
    return new Promise((resolve, reject) => {
            // the file you want to get the hash    
        var fd = fs.createReadStream(filePath);
        var hash = crypto.createHash('sha1');
        hash.setEncoding('hex');

        // read all file and pipe it (write it) to the hash object
        fd.pipe(hash);
        hash.on('error', (error) => {
            reject(error);
        })
        hash.on('finish', () => {
            resolve(hash.read());
        })
    })
}