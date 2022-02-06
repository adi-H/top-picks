import mongoose from 'mongoose';
import { ProductDoc } from './product';
import { UserDoc } from './user';

interface RatingAttributes {
	rating: number;
	user: UserDoc;
	product: ProductDoc;
	description: string;
}

interface RatingDoc extends mongoose.Document {
	rating: number;
	user: UserDoc;
	product: ProductDoc;
	description: string;
}

interface RatingModel extends mongoose.Model<RatingDoc> {
	build(attrs: RatingAttributes): RatingDoc;
}

const ratingSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		},
		description: {
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

ratingSchema.statics.build = (attrs: RatingAttributes) => {
	return new Rating(attrs);
};

const Rating = mongoose.model<RatingDoc, RatingModel>('Rating', ratingSchema);

export { Rating };
