"use strict";
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
exports.__esModule = true;
var axios_1 = require("axios");
var SERVER_URL = 'https://20.82.37.12';
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
                return [4 /*yield*/, (0, axios_1["default"])(config)];
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
var generateData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var brands;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateBrands(brandsDetails)];
            case 1:
                brands = _a.sent();
                console.log(brands);
                return [2 /*return*/];
        }
    });
}); };
console.log('starting now!!~');
generateData().then(function () {
    console.log('finished!!~');
});
