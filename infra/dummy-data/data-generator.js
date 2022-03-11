"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var SERVER_URL = 'http://20.82.37.12';
var testImgPath = path_1.default.resolve(__dirname, 'alien.png');
var userDetails = [
    { email: 'test1@test.com', password: 'abc1234' },
    { email: 'test2@test.com', password: 'asmnbclkj12' }
];
var brandsDetails = [
    { name: 'brand1', description: 'desc desc desc' },
    { name: 'brand2', description: 'desc desc desc' },
    { name: 'brand3', description: 'desc desc desc' }
];
var productsDetails = [
    {
        name: 'product1',
        productType: 'cleanser',
        description: 'prod descp',
        bestForTags: ['combo skin', 'acne'],
        brandName: 'brand1'
    },
    {
        name: 'product2',
        productType: 'cleanser',
        description: 'prod descp2134567',
        bestForTags: ['combo skin', 'hyperpigmentation'],
        brandName: 'brand1'
    },
    {
        name: 'product3',
        productType: 'cleanser',
        description: 'prod descp',
        bestForTags: ['dry skin', 'hyperpigmentation'],
        brandName: 'brand2'
    },
    {
        name: 'product4',
        productType: 'cleanser',
        description: 'prod descp1234567',
        bestForTags: ['combo skin', 'acne'],
        brandName: 'brand3'
    }
];
////////////////////////////////////////////
var createRating = function (userCookie, productId, desc, rating) { return __awaiter(void 0, void 0, void 0, function () {
    var config, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    method: 'POST',
                    url: SERVER_URL + '/api/user-ratings',
                    data: {
                        product: productId,
                        desc: desc,
                        rating: rating
                    },
                    headers: {
                        Cookie: userCookie
                    }
                };
                return [4 /*yield*/, (0, axios_1.default)(config)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
        }
    });
}); };
var generateRatings = function (products, users) { return __awaiter(void 0, void 0, void 0, function () {
    var ratings, _i, products_1, product, _a, users_1, user, conf, body;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ratings = [];
                _i = 0, products_1 = products;
                _b.label = 1;
            case 1:
                if (!(_i < products_1.length)) return [3 /*break*/, 6];
                product = products_1[_i];
                if (!product.id)
                    return [3 /*break*/, 5];
                _a = 0, users_1 = users;
                _b.label = 2;
            case 2:
                if (!(_a < users_1.length)) return [3 /*break*/, 5];
                user = users_1[_a];
                if (!user.cookie)
                    return [3 /*break*/, 4];
                conf = {
                    userCookie: user.cookie,
                    productId: product.id,
                    desc: 'asdkjbasd laskdj desc desc blah',
                    rating: Math.floor(Math.random() * 6) // max rating is 5, output from 0-5
                };
                return [4 /*yield*/, createRating(conf.userCookie, conf.productId, conf.desc, conf.rating)];
            case 3:
                body = _b.sent();
                ratings.push(body);
                _b.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, ratings];
        }
    });
}); };
var createUser = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var config, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    method: 'POST',
                    url: SERVER_URL + '/api/users/signup',
                    data: {
                        email: email,
                        password: password
                    }
                };
                return [4 /*yield*/, (0, axios_1.default)(config)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
var generateUsers = function (usersInfo) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, usersInfo_1, user, body, cookie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, usersInfo_1 = usersInfo;
                _a.label = 1;
            case 1:
                if (!(_i < usersInfo_1.length)) return [3 /*break*/, 4];
                user = usersInfo_1[_i];
                return [4 /*yield*/, createUser(user.email, user.password)];
            case 2:
                body = _a.sent();
                user.id = body.data.id;
                if (body.headers['set-cookie']) {
                    cookie = body.headers['set-cookie'].map(function (c) { return c.split(';')[0]; }).join('; ');
                    user.cookie = cookie;
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, usersInfo];
        }
    });
}); };
var createBrand = function (name, description) { return __awaiter(void 0, void 0, void 0, function () {
    var config, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    method: 'POST',
                    url: SERVER_URL + '/api/brands',
                    data: {
                        name: name,
                        description: description
                    }
                };
                return [4 /*yield*/, (0, axios_1.default)(config)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
        }
    });
}); };
var generateBrands = function (brandsInfo) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, brandsInfo_1, brand, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, brandsInfo_1 = brandsInfo;
                _a.label = 1;
            case 1:
                if (!(_i < brandsInfo_1.length)) return [3 /*break*/, 4];
                brand = brandsInfo_1[_i];
                return [4 /*yield*/, createBrand(brand.name, brand.description)];
            case 2:
                body = _a.sent();
                brand.id = body.id;
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, brandsInfo];
        }
    });
}); };
var createProduct = function (name, productType, bestForTags, brandId, description) { return __awaiter(void 0, void 0, void 0, function () {
    var form, config, res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                form = new form_data_1.default();
                form.append('name', name);
                form.append('productType', productType);
                form.append('bestForTags', bestForTags.toString());
                form.append('brand', brandId);
                form.append('description', description);
                form.append('productImg', fs_1.default.createReadStream(testImgPath));
                config = {
                    method: 'post',
                    url: SERVER_URL + '/api/products',
                    headers: __assign({}, form.getHeaders()),
                    data: form
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, axios_1.default)(config)];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var generateProducts = function (productsInfo, brands) { return __awaiter(void 0, void 0, void 0, function () {
    var _loop_1, _i, productsInfo_1, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _loop_1 = function (product) {
                    var brand, body;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                brand = brands.filter(function (b) { return product.brandName === b.name; })[0];
                                product.brandId = brand.id;
                                if (!product.brandId) return [3 /*break*/, 2];
                                return [4 /*yield*/, createProduct(product.name, product.productType, product.bestForTags, product.brandId, product.description)];
                            case 1:
                                body = _b.sent();
                                product.id = body.id;
                                return [3 /*break*/, 3];
                            case 2:
                                console.log('no brand id!!', product.name);
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, productsInfo_1 = productsInfo;
                _a.label = 1;
            case 1:
                if (!(_i < productsInfo_1.length)) return [3 /*break*/, 4];
                product = productsInfo_1[_i];
                return [5 /*yield**/, _loop_1(product)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, productsInfo];
        }
    });
}); };
var generateData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, brands, prods, ratings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateUsers(userDetails)];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, generateBrands(brandsDetails)];
            case 2:
                brands = _a.sent();
                return [4 /*yield*/, generateProducts(productsDetails, brands)];
            case 3:
                prods = _a.sent();
                return [4 /*yield*/, generateRatings(prods, users)];
            case 4:
                ratings = _a.sent();
                console.log(ratings);
                return [2 /*return*/];
        }
    });
}); };
console.log('starting now!!~');
generateData().then(function () {
    console.log('finished!!~');
});
