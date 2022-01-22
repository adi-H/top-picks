import mongoose from 'mongoose';

interface BrandAttributes {
	name: string;
	description: string;
}

interface BrandDoc extends mongoose.Document {
	name: string;
	description: string;
}

interface BrandModel extends mongoose.Model<BrandDoc> {
	build(attrs: BrandAttributes): BrandDoc;
}

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
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
	return new Brand(attrs);
};

const Brand = mongoose.model<BrandDoc, BrandModel>('Brand', brandSchema);

export { Brand };
