import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import FormData, { from } from 'form-data';
import path from 'path';
import fs from 'fs';

const SERVER_URL = 'http://20.82.37.12';
const testImgPath = path.resolve(__dirname, 'alien.png');

interface BrandDetails {
	name: string;
	description: string;
	id?: string;
}

const brandsDetails: BrandDetails[] = [
	{ name: 'brand1', description: 'desc desc desc' },
	{ name: 'brand2', description: 'desc desc desc' },
	{ name: 'brand3', description: 'desc desc desc' }
];

interface ProductDetails {
	name: string;
	description: string;
	id?: string;
	productType: string;
	bestForTags: Array<String>;
	brandName: string;
	brandId?: string;
}

const productsDetails: ProductDetails[] = [
	{
		name: 'product1',
		productType: 'cleanser',
		description: 'prod descp',
		bestForTags: [ 'combo skin', 'acne' ],
		brandName: 'brand1'
	},
	{
		name: 'product2',
		productType: 'cleanser',
		description: 'prod descp2134567',
		bestForTags: [ 'combo skin', 'hyperpigmentation' ],
		brandName: 'brand1'
	},
	{
		name: 'product3',
		productType: 'cleanser',
		description: 'prod descp',
		bestForTags: [ 'dry skin', 'hyperpigmentation' ],
		brandName: 'brand2'
	},
	{
		name: 'product4',
		productType: 'cleanser',
		description: 'prod descp1234567',
		bestForTags: [ 'combo skin', 'acne' ],
		brandName: 'brand3'
	}
];

const createBrand = async (name: string, description: string) => {
	const config: AxiosRequestConfig = {
		method: 'POST',
		url: SERVER_URL + '/api/brands',
		data: {
			name,
			description
		}
	};

	const res = await axios(config);
	return res.data;
};

const generateBrands = async (brandsInfo: Array<BrandDetails>) => {
	for (const brand of brandsInfo) {
		const body = await createBrand(brand.name, brand.description);
		brand.id = body.id;
	}

	return brandsInfo;
};

const createProduct = async (
	name: string,
	productType: string,
	bestForTags: Array<String>,
	brandId: string,
	description: string
) => {
	let form = new FormData();

	form.append('name', name);
	form.append('productType', productType);
	form.append('bestForTags', bestForTags.toString());
	form.append('brand', brandId);
	form.append('description', description);
	form.append('productImg', fs.createReadStream(testImgPath));

	let config: AxiosRequestConfig = {
		method: 'post',
		url: SERVER_URL + '/api/products',
		headers: {
			...form.getHeaders()
		},
		data: form
	};
	try {
		const res = await axios(config);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

const generateProducts = async (productsInfo: Array<ProductDetails>, brands: Array<BrandDetails>) => {
	for (let product of productsInfo) {
		const brand: BrandDetails = brands.filter((b) => product.brandName === b.name)[0];
		product.brandId = brand.id;
		if (product.brandId) {
			const body = await createProduct(
				product.name,
				product.productType,
				product.bestForTags,
				product.brandId,
				product.description
			);
			product.id = body.id;
		} else {
			console.log('no brand id!!', product.name);
		}
	}

	return productsInfo;
};

const generateData = async () => {
	const brands = await generateBrands(brandsDetails);
	console.log(brands);
	const prods = await generateProducts(productsDetails, brands);
	console.log('~~~~~~~~~~~~~~', prods);

	return;
};

console.log('starting now!!~');
generateData().then(() => {
	console.log('finished!!~');
});
