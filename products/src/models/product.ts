import { BrandDoc } from './brand';
import mongoose from 'mongoose';
import { ProductImgDoc } from './productImg';

interface ProductAttributes {
	name: string;
	productType: string;
	avgRating: number;
	brand: BrandDoc;
	productImg: ProductImgDoc;
	description: string;
	bestForTags: Array<String>;
	numberOfRatings: number;
}

interface ProductDoc extends mongoose.Document {
	name: string;
	productType: string;
	avgRating: number;
	brand: BrandDoc;
	productImg: ProductImgDoc;
	description: string;
	bestForTags: Array<String>;
	numberOfRatings: number;
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
		},
		description: {
			type: String
		},
		bestForTags: {
			type: Array
		},
		numberOfRatings: {
			type: Number,
			default: 0
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				ret.imgPath = `/api/products/img/${ret.productImg._id}`;
			}
		}
	}
);

productSchema.statics.build = (attrs: ProductAttributes) => {
	return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
