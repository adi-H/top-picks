import { Message } from 'node-nats-streaming';
import { ProductCountInListUpdatedListener, ProductCountInListUpdatedEvent } from '../list-count-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { User } from '../../../models/user';
import { List } from '../../../models/list';

const setup = async () => {
	const listener = new ProductCountInListUpdatedListener(natsWrapper.client);

	const list = await List.build({ name: 'test', count: 2, _id: new mongoose.Types.ObjectId().toHexString() });
	await list.save();
	const user = await User.build({ email: 'test@test.com', password: 'abc123', lists: [ list ] });
	await user.save();

	const data: ProductCountInListUpdatedEvent['data'] = {
		listId: list.id,
		userId: user.id,
		count: 3
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	};

	return { listener, data, msg };
};

it('updates the list count', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	const user = await User.findById(data.userId).populate('lists');
	expect(user).toBeDefined();
	expect(user!.lists).toHaveLength(1);
	expect(user!.lists[0].count).toEqual(3);
	expect(user!.lists[0]._id).toEqual(data.listId);
});

it('acks the message', async () => {
	const { listener, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack).toHaveBeenCalled();
});
