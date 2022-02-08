import sqlite3 from "sqlite3"
import { v4 as uuidv4 } from "uuid"

const DATABASE = `Database.db`
const DATABASE_PATH = `${__dirname}\\DB\\${DATABASE}`

const FilesTable = `FilesTable`
const FileLocationTable = `FileLocationTable`

export interface FileModel {
    title: string;
    description: string;
    original_name: string;
    hash: string;
    id: string;
}

let db = new sqlite3.Database(DATABASE_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
    if (error) {
        console.error(DATABASE_PATH)
        console.error(`[OPEN DATABASE ERROR] ${error}`)
    } else {
        console.log("Opened database");
        init();
    }
})

export const init = () => {
    let query = `
        CREATE TABLE IF NOT EXISTS ${FileLocationTable} (
            hash text PRIMARY KEY,
            path text NOT NULL
        );   
    `
    runAsync(query).then(() => {
        query = `
        CREATE TABLE IF NOT EXISTS ${FilesTable} (
            title text,
            description text,
            hash text,
            originalName text,
            id text PRIMARY KEY,
            FOREIGN KEY (hash) 
                REFERENCES ${FileLocationTable} (hash)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
        );   
        `
        runAsync(query).then(() => {
            console.log("Successfully created the tables.");
        });
    });
}

// const run = async (query: string, params: string[] = []) => {
//     return new Promise((resolve, reject) => {
//         db.run(query, params, (error) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(this)
//             }
//         })
//     })
// }

const runAsync = (sql: string, ...params: string[]) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve(this);
        });
    });
};

const runBatchAsync = (statements: string[][]) => {
    var batch: string[][] = [['BEGIN'], ...statements, ['COMMIT']];
    let results = []
    let promise: Promise<unknown> = Promise.resolve();
    batch.forEach((sequence) => {
        promise = promise.then((result) => {
            results.push(result);
            let [sql, ...params] = sequence;
            return runAsync(sql, ...params);
        })
    })
    return promise;
}

// const _runBatchAsync = (statements: string[][]) => {
//     var results: any[] = [];
//     var batch: string[][] = [['BEGIN'], ...statements, ['COMMIT']];
//     // @ts-ignore
//     return batch.reduce(async (previousPromise: Promise<void>, currentStatement: string[]) => {
//         return previousPromise.then((result: any) => {
//             results.push(result);
//             // @ts-ignore
//             return runAsync(...[].concat(currentStatement));
//         })
//     }, Promise.resolve());
// };

const get = async (query: string, ...params: string[]): Promise<any> => { 
    return new Promise((resolve, reject) => {
        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                resolve(row);
            }
        })
    })
}

const getAll = async (query: string, ...params: string[]): Promise<any> => { 
    return new Promise((resolve, reject) => {
        db.all(query, params, (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        })
    })
}


export const storeInDB = async (filename: string, originalName: string, title: string, description: string, hash: string) => {
    let id = uuidv4();
    // Check database for hash
        // If hit, continue
        // If miss, store it in the database 
            // Store it with ID and file_path
            // 2 Tables 
            // HASH - FILE_PATH

            // title: string;
            // description: string;
            // original filename
            // hash: string;
            // id: string;
    
    let queries = [[`INSERT OR IGNORE INTO ${FileLocationTable}(hash, path) VALUES (?, ?)`, hash, filename],
        [`INSERT OR IGNORE INTO ${FilesTable}(title, description, hash, originalName, id) VALUES (?, ?, ?, ?, ?)`, title, description, hash, originalName, id]]
    
    return runBatchAsync(queries)
}

export const getFilePath = (hash: string): Promise<undefined | {path: string}> => {
    let query = `
        SELECT path
        FROM ${FileLocationTable}
        WHERE hash = (?)
    `
    return get(query, hash)
}

export const getFileHash = (id: string): Promise<undefined | {hash: string}> => {
    let query = `
        SELECT hash
        FROM ${FilesTable}
        WHERE id = (?)
    `
    return get(query, id);
}


export const getAllFiles = (): Promise<[] | FileModel[]> => {
    let query = `SELECT * FROM ${FilesTable}`
    return getAll(query);
}
export const getAllFileLocations = (): Promise<[] | {path: string, hash: string}[]>  => {
    let query = `SELECT * FROM ${FileLocationTable}`
    return getAll(query);
}

export const closeDatabase = () => {
    db.close();
}

