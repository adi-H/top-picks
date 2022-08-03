import { Message } from 'node-nats-streaming';
import { ListDetailsUpdatedListener } from '../list-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { User } from '../../../models/user';
import { List } from '../../../models/list';
import { ListDetailsUpdatedEvent } from '@adih-toppicks/common';

const setup = async () => {
	const listener = new ListDetailsUpdatedListener(natsWrapper.client);

	const list = await List.build({ name: 'test', count: 0, _id: new mongoose.Types.ObjectId().toHexString() });
	await list.save();
	const user = await User.build({ email: 'test@test.com', password: 'abc123', lists: [ list ], userAccess: '~' });
	await user.save();

	const data: ListDetailsUpdatedEvent['data'] = {
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

it('updates the list name', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	const user = await User.findById(data.userId).populate('lists');
	expect(user).toBeDefined();
	expect(user!.lists).toHaveLength(1);
	expect(user!.lists[0].name).toEqual('new name');
	expect(user!.lists[0]._id).toEqual(data.listId);
});

it('acks the message', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack).toHaveBeenCalled();
});
