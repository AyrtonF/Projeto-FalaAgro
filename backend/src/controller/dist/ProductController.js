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
exports.deleteAllProduct = exports.deleteUniqueProduct = exports.getAllProduct = exports.getUniqueProduct = exports.updateProduct = exports.createProduct = void 0;
var prisma_1 = require("./../database/prisma");
exports.createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, amount, storeId, product;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, amount = _a.amount;
                storeId = req.params.storeId;
                return [4 /*yield*/, prisma_1.prisma.product.create({
                        data: {
                            name: name,
                            price: price,
                            amount: amount,
                            Store: {
                                connect: {
                                    id: storeId
                                }
                            }
                        }
                    })];
            case 1:
                product = _b.sent();
                return [2 /*return*/, res.json(product)];
        }
    });
}); };
exports.updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, amount, productId, id, isProduct, product, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, amount = _a.amount;
                productId = req.params.productId;
                id = req.user.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1.prisma.product.findUnique({
                        where: {
                            id: productId
                        },
                        include: {
                            Store: true
                        }
                    })];
            case 2:
                isProduct = _c.sent();
                if (!isProduct) {
                    return [2 /*return*/, res.status(404).json({ message: "Produto não existe" })];
                }
                if (id !== ((_b = isProduct === null || isProduct === void 0 ? void 0 : isProduct.Store) === null || _b === void 0 ? void 0 : _b.userId)) {
                    return [2 /*return*/, res.status(404).json({ message: "Usuario não é dono do produto" })];
                }
                return [4 /*yield*/, prisma_1.prisma.product.update({
                        where: {
                            id: productId
                        },
                        data: {
                            name: name,
                            price: price,
                            amount: amount
                        }
                    })];
            case 3:
                product = _c.sent();
                return [2 /*return*/, res.status(200).json(product)];
            case 4:
                error_1 = _c.sent();
                return [2 /*return*/, res.status(400).json(error_1.message)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUniqueProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, id, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                id = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.product.findUnique({
                        where: {
                            id: productId
                        }
                    })];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: "Produto não existe" })];
                }
                return [2 /*return*/, res.status(200).json(product)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(400).json(error_2.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.product.findMany()];
            case 1:
                products = _a.sent();
                return [2 /*return*/, res.json(products)];
        }
    });
}); };
exports.deleteUniqueProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, id, isProduct, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                productId = req.params.productId;
                id = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1.prisma.product.findUnique({
                        where: {
                            id: productId
                        },
                        include: {
                            Store: true
                        }
                    })];
            case 2:
                isProduct = _b.sent();
                if (!isProduct) {
                    return [2 /*return*/, res.status(404).json({ message: "Produto não existe" })];
                }
                if (id !== ((_a = isProduct === null || isProduct === void 0 ? void 0 : isProduct.Store) === null || _a === void 0 ? void 0 : _a.userId)) {
                    return [2 /*return*/, res.status(404).json({ message: "Usuario não é dono do produto" })];
                }
                return [4 /*yield*/, prisma_1.prisma.product.deleteMany({
                        where: {
                            id: productId
                        }
                    })];
            case 3:
                _b.sent();
                res.status(200).json({ message: "Produto deletado com sucesso" });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(400).json(error_3.message)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteAllProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.product.deleteMany()];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Todos os produtos deletados com sucessp" })];
        }
    });
}); };
