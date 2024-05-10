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
exports.getAllSaleByBuyer = exports.getAllSaleBySeller = exports.getAllSale = exports.createSale = void 0;
var prisma_1 = require("./../database/prisma"); // Importa o objeto prisma para interagir com o banco de dados
exports.createSale = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, products, userSellerId, id, productsByDatabase, productWithQuantify, total, _i, productWithQuantify_1, product, sale, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, products = _a.products, userSellerId = _a.userSellerId;
                id = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1.prisma.product.findMany({
                        where: {
                            id: { "in": products.map(function (product) { return product.id; }) }
                        }
                    })];
            case 2:
                productsByDatabase = _b.sent();
                productWithQuantify = productsByDatabase.map(function (product) {
                    var id = product.id, name = product.name, price = product.price;
                    var quantify = products.find(function (p) { return p.id === product.id; }).quantify; // Encontra a quantidade correspondente ao produto
                    return {
                        id: id,
                        name: name,
                        price: price,
                        quantify: quantify
                    };
                });
                total = 0;
                for (_i = 0, productWithQuantify_1 = productWithQuantify; _i < productWithQuantify_1.length; _i++) { // Calcula o valor total da venda somando o preço de cada produto multiplicado pela quantidade
                    product = productWithQuantify_1[_i];
                    total += product.price * parseInt(product.quantify);
                }
                if (id === userSellerId) {
                    return [2 /*return*/, res.status(400).json({ message: "Não pode existir venda para si mesmo" })];
                }
                return [4 /*yield*/, prisma_1.prisma.sale.create({
                        data: {
                            total_value: total,
                            Seller: { connect: { id: userSellerId } },
                            Buyer: { connect: { id: id } },
                            SaleProduct: {
                                create: productWithQuantify.map(function (product) { return ({
                                    Product: { connect: { id: product.id } },
                                    quantify: product.quantify
                                }); })
                            }
                        },
                        include: {
                            SaleProduct: true
                        }
                    })];
            case 3:
                sale = _b.sent();
                productWithQuantify.map(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: // Atualiza a quantidade de cada produto no banco de dados após a venda
                            return [4 /*yield*/, prisma_1.prisma.product.updateMany({
                                    where: {
                                        id: product.id
                                    },
                                    data: {
                                        amount: {
                                            decrement: parseInt(product.quantify) // Decrementa a quantidade do produto vendido
                                        }
                                    }
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, res.status(200).json({ sale: sale, message: "Compra realizada com sucesso" })]; // Retorna a venda e uma mensagem de sucesso em formato JSON
            case 4:
                error_1 = _b.sent();
                console.error(error_1); // Registra o erro no console
                return [2 /*return*/, res.status(400).json(error_1.message)]; // Retorna uma resposta de erro com a mensagem de erro em formato JSON
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAllSale = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sales, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.prisma.sale.findMany({
                        select: {
                            id: true,
                            total_value: true,
                            Seller: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            },
                            Buyer: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            },
                            SaleProduct: {
                                select: {
                                    Product: {
                                        select: {
                                            id: true,
                                            name: true,
                                            price: true
                                        }
                                    },
                                    quantify: true
                                }
                            },
                            created_at: true
                        }
                    })];
            case 1:
                sales = _a.sent();
                return [2 /*return*/, res.status(200).json(sales)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(400).json(error_2.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllSaleBySeller = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sales, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.sale.findMany({
                        where: {
                            sellerId: id
                        }
                    })];
            case 2:
                sales = _a.sent();
                return [2 /*return*/, res.status(200).json(sales)];
            case 3:
                error_3 = _a.sent();
                console.error(error_3.message);
                return [2 /*return*/, res.status(400).json(error_3.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllSaleByBuyer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sales, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.sale.findMany({
                        where: {
                            buyerId: id
                        }
                    })];
            case 2:
                sales = _a.sent();
                return [2 /*return*/, res.status(200).json(sales)];
            case 3:
                error_4 = _a.sent();
                console.error(error_4.message);
                return [2 /*return*/, res.status(400).json(error_4.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
