import mongoose from 'mongoose';

interface BrandAttributes {
	id: string;
	name: string;
}

export interface BrandDoc extends mongoose.Document {
	name: string;
}

interface BrandModel extends mongoose.Model<BrandDoc> {
	build(attrs: BrandAttributes): BrandDoc;
}

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
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

brandSchema.statics.build = (attrs: BrandAttributes) => {
	return new Brand({
		_id: attrs.id,
		name: attrs.name
	});
};

const Brand = mongoose.model<BrandDoc, BrandModel>('Brand', brandSchema);

export { Brand };
