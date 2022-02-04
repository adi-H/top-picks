import { BrandDoc } from './brand';
import mongoose from 'mongoose';

interface ProductAttributes {
	name: string;
	productType: string;
	avgRating: number;
	brand: BrandDoc;
	productImg: Buffer;
}

interface ProductDoc extends mongoose.Document {
	name: string;
	productType: string;
	avgRating: number;
	brand: BrandDoc;
	productImg: Buffer;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
	build(attrs: ProductAttributes): ProductDoc;
}

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		avgRating: {
			type: Number
		},
		productType: {
			type: String,
			required: true
		},
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Brand'
		},
		productImg: {
			data: Buffer,
			contentType: String
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

productSchema.statics.build = (attrs: ProductAttributes) => {
	return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
