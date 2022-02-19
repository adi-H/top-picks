import { createList, getUserCookies, createProduct } from './helper-functions';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('emits event with successful insert', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const product = await createProduct();

	const res = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: product.id, dissociate: false } ]
		})
		.expect(201);

	// new list, new insert
	expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
});

it('returns 201 with a valid product inserted', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const product = await createProduct();

	const res = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: product.id, dissociate: false } ]
		})
		.expect(201);
	expect(res.body.id).toEqual(list.id);
	expect(res.body.products[0].id).toEqual(product.id);
});

it('returns 201 with a valid product removed', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const product = await createProduct();

	// insert product
	const insertRes = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: product.id, dissociate: false } ]
		})
		.expect(201);
	expect(insertRes.body.id).toEqual(list.id);
	expect(insertRes.body.products[0].id).toEqual(product.id);

	// remove product
	// insert product
	const dissociateRes = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: product.id, dissociate: true } ]
		})
		.expect(201);
	expect(dissociateRes.body.id).toEqual(list.id);
	expect(dissociateRes.body.products).toHaveLength(0);
});

it('returns 201 with adding 2 products', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const productOne = await createProduct();
	const productTwo = await createProduct();

	// insert product
	const insertRes = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: productOne.id, dissociate: false }, { id: productTwo.id, dissociate: false } ]
		})
		.expect(201);
	expect(insertRes.body.id).toEqual(list.id);
	expect(insertRes.body.products[0].id).toEqual(productOne.id);
	expect(insertRes.body.products[1].id).toEqual(productTwo.id);
	expect(insertRes.body.products).toHaveLength(2);
});

it('returns 201 with input of 1 invalid product and does nothing', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);

	// insert product
	const insertRes = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: '76rcvbnm', dissociate: false } ]
		})
		.expect(201);
	expect(insertRes.body.id).toEqual(list.id);
	expect(insertRes.body.products).toHaveLength(0);
});

it('returns 201 with input of 1 invalid product (missing dissociate property)', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const productOne = await createProduct();

	// insert product
	const insertRes = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: productOne.id } ]
		})
		.expect(201);
	expect(insertRes.body.id).toEqual(list.id);
	expect(insertRes.body.products).toHaveLength(0);
});

it('returns 201 with input of 1 invalid product (missing id property)', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const productOne = await createProduct();

	// insert product
	const insertRes = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { dissociate: true } ]
		})
		.expect(201);
	expect(insertRes.body.id).toEqual(list.id);
	expect(insertRes.body.products).toHaveLength(0);
});

it('returns 201 with insert input of 1 valid 1 invalid prod (inserts only valid)', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const productOne = await createProduct();

	// insert product
	const insertRes = await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: [ { id: productOne.id, dissociate: false }, { id: '76rcvbnm', dissociate: false } ]
		})
		.expect(201);
	expect(insertRes.body.id).toEqual(list.id);
	expect(insertRes.body.products[0].id).toEqual(productOne.id);
	expect(insertRes.body.products).toHaveLength(1);
});

it('401 for no user token', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);

	await request(app).put(`/api/lists/${list.id}`).expect(401);
});

it('401 for trying to edit another users list', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const otherCookie = await getUserCookies();

	await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', otherCookie)
		.send({
			products: []
		})
		.expect(401);
});

it('404 for list id that doesnt exist', async () => {
	const cookie = await getUserCookies();

	await request(app)
		.put('/api/lists/3456')
		.set('Cookie', cookie)
		.send({
			products: []
		})
		.expect(404);
});

it('400 for no input', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	await request(app).put(`/api/lists/${list.id}`).set('Cookie', cookie).send().expect(400);
});

it('400 for invalid products format (string)', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: 'desc test2'
		})
		.expect(400);
});

it('400 for invalid products format (numerical)', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	await request(app)
		.put(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			products: 876
		})
		.expect(400);
});
