import mongoose from 'mongoose';

interface ListAttributes {
	_id: string;
	name: string;
	count: number;
}

interface ListDoc extends mongoose.Document {
	_id: string;
	name: string;
	count: number;
}

interface ListModel extends mongoose.Model<ListDoc> {
	build(attrs: ListAttributes): ListDoc;
}

const listSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		count: {
			type: Number
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
