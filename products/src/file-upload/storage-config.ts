import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// DOCUMENTATION
// https://stackoverflow.com/a/69798484

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.memoryStorage();
// https://github.com/expressjs/multer#memorystorage

// export const fileStorage = multer.diskStorage({
// 	destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
// 		callback(null, '/tmp/uploads/');
// 	},

// 	filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
// 		callback(null, file.originalname + Date.now());
// 	}
// });
