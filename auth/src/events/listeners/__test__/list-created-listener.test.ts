import { Message } from 'node-nats-streaming';
import { NewListCreatedListener } from '../list-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { User } from '../../../models/user';
import { NewListCreatedEvent } from '@adih-toppicks/common';

const setup = async () => {
	const listener = new NewListCreatedListener(natsWrapper.client);

	const user = await User.build({ email: 'test@test.com', password: 'abc123', lists: [] });
	await user.save();

	const data: NewListCreatedEvent['data'] = {
		listId: new mongoose.Types.ObjectId().toHexString(),
		userId: user.id,
		name: 'test list'
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	};

	return { listener, data, msg };
};

it('adds the list to the user correctly', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	const user = await User.findById(data.userId).populate('lists');
	expect(user).toBeDefined();
	expect(user!.lists).toHaveLength(1);
	expect(user!.lists[0].name).toEqual('test list');
	expect(user!.lists[0]._id).toEqual(data.listId);
});

it('acks the message', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack).toHaveBeenCalled();
});
