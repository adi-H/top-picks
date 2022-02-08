import request from 'supertest';
import { app } from '../../app';
import { Brand } from '../../models/brand';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

const createBrand = async () => {
	const brand = Brand.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toString()
	});
	await brand.save();
	return brand;
};

const testImgPath = __dirname + './../../__mocks__/alien.png';

const createProduct = async (attrs: object, imgPath: string) => {
	let req = request(app).post('/api/products');
	for (const [ key, value ] of Object.entries(attrs)) {
		req = req.field(key, value);
	}
	const res = await req.attach('productImg', imgPath).expect(201);

	return res;
};

const getProductDetails = async (
	name: string = 'test',
	productType: string = 'cleanser',
	description: string = 'blah desc',
	brandId: string = ''
) => {
	if (brandId == '') {
		// generate new brand
		const brand = await createBrand();
		brandId = brand.id;
	}
	const prodDetails = { name, productType, description, brand: brandId };

	const details = await createProduct(prodDetails, testImgPath);
	return details;
};

it('return 201 and update ok with all parameters', async () => {
	const productCreationDetails = await getProductDetails();

	const res = await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			name: 'test2',
			productType: 'cleanser',
			brand: productCreationDetails.body.brand.id,
			avgRating: 5,
			description: 'blah blah blah2'
		})
		.expect(201);

	expect(res.body.name).toEqual('test2');
	expect(res.body.productType).toEqual('cleanser');
	// bandaid for weird failing in tests
	expect(res.body.brand).toEqual(productCreationDetails.body.brand.id);
	expect(res.body.description).toEqual('blah blah blah2');
	expect(res.body.id).toEqual(productCreationDetails.body.id);
});

it('return 201 with only name', async () => {
	const productCreationDetails = await getProductDetails();

	const res = await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			name: 'test2'
		})
		.expect(201);

	expect(res.body.name).toEqual('test2');
	expect(res.body.productType).toEqual('cleanser');
	expect(res.body.brand).toEqual(productCreationDetails.body.brand);
	expect(res.body.id).toEqual(productCreationDetails.body.id);
});

it('return 201 with only desc', async () => {
	const productCreationDetails = await getProductDetails();

	const res = await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			description: 'abkahasd askdjhasd kjhasd'
		})
		.expect(201);

	expect(res.body.name).toEqual('test');
	expect(res.body.description).toEqual('abkahasd askdjhasd kjhasd');
	expect(res.body.brand).toEqual(productCreationDetails.body.brand);
	expect(res.body.id).toEqual(productCreationDetails.body.id);
});

it('return 201 with only productType', async () => {
	const productCreationDetails = await getProductDetails();

	const res = await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			productType: 'cleanser'
		})
		.expect(201);

	expect(res.body.name).toEqual('test');
	expect(res.body.productType).toEqual('cleanser');
	expect(res.body.brand).toEqual(productCreationDetails.body.brand);
	expect(res.body.avgRating).toEqual(0);
	expect(res.body.id).toEqual(productCreationDetails.body.id);
});

it('return 201 with only brand', async () => {
	const productCreationDetails = await getProductDetails();
	const newBrand = await createBrand();

	const res = await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			brand: newBrand.id
		})
		.expect(201);

	expect(res.body.name).toEqual('test');
	expect(res.body.productType).toEqual('cleanser');
	expect(res.body.brand).toEqual(newBrand.id);
	expect(res.body.avgRating).toEqual(0);
	expect(res.body.id).toEqual(productCreationDetails.body.id);
});

it('return 201 with only avgRating', async () => {
	const productCreationDetails = await getProductDetails();

	const res = await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			avgRating: 4.0
		})
		.expect(201);

	expect(res.body.name).toEqual('test');
	expect(res.body.productType).toEqual('cleanser');
	expect(res.body.avgRating).toEqual(4.0);
	expect(res.body.brand).toEqual(productCreationDetails.body.brand);
	expect(res.body.id).toEqual(productCreationDetails.body.id);
});

it('return 404 if Product id doesnt exist', async () => {
	await request(app)
		.put(`/api/products/123`)
		.send({
			name: 'test2',
			productType: 'cleanser',
			brand: new mongoose.Types.ObjectId().toString(),
			avgRating: 5
		})
		.expect(404);
});

it('return 400 if name is empty', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			name: ''
		})
		.expect(400);
});

it('return 400 if type is empty', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			productType: ''
		})
		.expect(400);
});

it('return 400 if type is invalid', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			productType: 'adkjgasdalidh'
		})
		.expect(400);
});

it('return 400 if brand is empty', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			brand: ''
		})
		.expect(400);
});

it('return 400 if brand id doesnt exist', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			brand: new mongoose.Types.ObjectId().toString()
		})
		.expect(400);
});

it('return 400 if avgRating is not a number', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			avgRating: 'asd'
		})
		.expect(400);
});

it('return 400 if avgRating is negative numebr', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			avgRating: -3
		})
		.expect(400);
});

it('return 400 if avgRating is 5+', async () => {
	const productCreationDetails = await getProductDetails();

	await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			avgRating: 9
		})
		.expect(400);
});

it('emits a product update event', async () => {
	const productCreationDetails = await getProductDetails();

	const res = await request(app)
		.put(`/api/products/${productCreationDetails.body.id}`)
		.send({
			name: 'test2',
			productType: 'cleanser',
			brand: productCreationDetails.body.brand.id,
			avgRating: 5
		})
		.expect(201);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
