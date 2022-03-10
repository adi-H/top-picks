import mongoose from 'mongoose';

interface UserAttributes {
	email: string;
	_id: string;
}

// interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttributes): UserDoc;
}

// interface that describes the properties
// that a User Document has
export interface UserDoc extends mongoose.Document {
	email: string;
	_id: string;
}

const userSchema = new mongoose.Schema<UserDoc>(
	{
		email: {
			type: String,
			required: true
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
				delete ret.__v;
			}
		}
	}
);

userSchema.statics.build = (attrs: UserAttributes) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
