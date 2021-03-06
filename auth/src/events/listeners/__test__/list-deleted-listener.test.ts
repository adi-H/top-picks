import { Message } from 'node-nats-streaming';
import { ListDeletedListener } from '../list-deleted-listener';
import { ListDeletedEvent } from '@adih-toppicks/common';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { User } from '../../../models/user';
import { List } from '../../../models/list';

const setup = async () => {
	const listener = new ListDeletedListener(natsWrapper.client);

	const list = await List.build({ name: 'test', count: 0, _id: new mongoose.Types.ObjectId().toHexString() });
	await list.save();
	const user = await User.build({ email: 'test@test.com', password: 'abc123', lists: [ list ], userAccess: '~' });
	await user.save();

	const data: ListDeletedEvent['data'] = {
		listId: list.id,
		userId: user.id,
		name: 'new name'
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	};

	return { listener, data, msg };
};

it('deletes the list and updates the user obj', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	const user = await User.findById(data.userId).populate('lists');
	expect(user).toBeDefined();
	expect(user!.lists).toHaveLength(0);
	const list = await List.findById(data.listId);
	expect(list).toBeNull();
});

it('acks the message', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack).toHaveBeenCalled();
});
