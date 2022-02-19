import mongoose from 'mongoose';
import { ProductDoc } from './product';
import { UserDoc } from './user';

interface ListAttributes {
	name: string;
	user: UserDoc;
	description: string;
	products: Array<ProductDoc>;
}

interface ListDoc extends mongoose.Document {
	name: string;
	user: UserDoc;
	description: string;
	products: Array<ProductDoc>;
}

interface ListModel extends mongoose.Model<ListDoc> {
	build(attrs: ListAttributes): ListDoc;
}

const listSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		products: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product'
				}
			],
			default: undefined
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

listSchema.statics.build = (attrs: ListAttributes) => {
	return new List(attrs);
};

const List = mongoose.model<ListDoc, ListModel>('List', listSchema);

export { List };
