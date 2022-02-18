import mongoose from 'mongoose';

interface ProductAttributes {
	id: string;
	name: string;
	avgRating: number;
}

export interface ProductDoc extends mongoose.Document {
	name: string;
	avgRating: number;
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
		_id: {
			type: String,
			required: true
		}
	},
	{
		_id: false,
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

productSchema.statics.build = (attrs: ProductAttributes) => {
	return new Product({
		_id: attrs.id,
		name: attrs.name,
		avgRating: attrs.avgRating
	});
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
