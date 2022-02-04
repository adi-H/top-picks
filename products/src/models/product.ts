import { BrandDoc } from './brand';
import mongoose from 'mongoose';
import { ProductImgDoc } from './productImg';

interface ProductAttributes {
	name: string;
	productType: string;
	avgRating: number;
	brand: BrandDoc;
	productImg: ProductImgDoc;
}

interface ProductDoc extends mongoose.Document {
	name: string;
	productType: string;
	avgRating: number;
	brand: BrandDoc;
	productImg: ProductImgDoc;
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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ProductImg'
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
