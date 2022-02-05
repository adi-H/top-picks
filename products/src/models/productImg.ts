import mongoose from 'mongoose';

interface ProductImgAttributes {
	buff: String;
	fileName: String;
}

export interface ProductImgDoc extends mongoose.Document {
	buff: String;
	fileName: String;
}

interface ProductImgModel extends mongoose.Model<ProductImgDoc> {
	build(attrs: ProductImgAttributes): ProductImgDoc;
}

const productImgSchema = new mongoose.Schema(
	{
		buff: {
			type: String
		},
		fileName: {
			type: String
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

productImgSchema.statics.build = (attrs: ProductImgAttributes) => {
	return new ProductImg(attrs);
};

const ProductImg = mongoose.model<ProductImgDoc, ProductImgModel>('ProductImg', productImgSchema);

export { ProductImg };

/*

import mongoose from 'mongoose';

interface ProductImgAttributes {
	buff: Buffer;
}

export interface ProductImgDoc extends mongoose.Document {
	buff: Buffer;
}

interface ProductImgModel extends mongoose.Model<ProductImgDoc> {
	build(attrs: ProductImgAttributes): ProductImgDoc;
}

const productImgSchema = new mongoose.Schema(
	{
		buff: {
			data: Buffer
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

productImgSchema.statics.build = (attrs: ProductImgAttributes) => {
	return new ProductImg(attrs);
};

const ProductImg = mongoose.model<ProductImgDoc, ProductImgModel>('ProductImg', productImgSchema);

export { ProductImg };
 
*/
