import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { ProductImg } from '../models/productImg';
import { fromBuffer } from 'file-type';
import { CustomError } from '../errors/custom-error';

const router = express.Router();

router.get('/api/products/img/:picId', async (req: Request, res: Response) => {
	try {
		const productImg = await ProductImg.findById(req.params.picId);

		if (!productImg) {
			throw new NotFoundError();
		}

		const fileBuffer = Buffer.from(productImg.buff, 'binary');
		const fileAttributes = await fromBuffer(fileBuffer);

		if (!fileAttributes) {
			throw new Error('oh no something went wrong!!');
		}

		res.writeHead(200, {
			'Content-Type': fileAttributes.mime,
			'Content-disposition': 'attachment;filename=' + productImg.fileName
		});
		res.end(fileBuffer);
	} catch (e) {
		if (e instanceof CustomError) {
			throw e;
		}
		throw new NotFoundError();
	}
});

export { router as getProductPicRouter };
