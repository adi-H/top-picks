import { ListDoc } from './list';
import mongoose from 'mongoose';
import { Password } from '../services/password';

// describes the attributes that are required
// to create a new instance of User
interface UserAttributes {
	email: string;
	password: string;
	lists: Array<ListDoc>;
	userAccess: string;
}

// interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttributes): UserDoc;
}

// interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
	lists: Array<ListDoc>;
	userAccess: string;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		lists: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'List'
				}
			]
		},
		userAccess: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			}
		}
	}
);

userSchema.pre('save', async function(done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
