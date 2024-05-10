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
exports.deleteUserMany = exports.getUniqueUser = exports.getAllUser = exports.createUser = void 0;
var bcryptjs_1 = require("bcryptjs");
var prisma_1 = require("./../database/prisma");
exports.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, accessName, isUniqueEmail, isAccessName, hashPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, accessName = _a.accessName;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        //retorna o email igual ao requisitado ou null se não existir
                        where: {
                            email: email
                        }
                    })];
            case 1:
                isUniqueEmail = _b.sent();
                return [4 /*yield*/, prisma_1.prisma.access.findUnique({
                        // armazena em isAccessName o acesso em access correspondente a accesssName se existir
                        where: {
                            name: accessName
                        }
                    })];
            case 2:
                isAccessName = _b.sent();
                if (!isAccessName) {
                    //se acesso não existir ele retorna a mensagem de erro
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Esse nível de acesso não existe" })];
                }
                if (isUniqueEmail) {
                    //Se email existir ele retorna o erro falando que o email já existe
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Já existe um usuário com esse email" })];
                }
                return [4 /*yield*/, bcryptjs_1.hash(password, 8)];
            case 3:
                hashPassword = _b.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        //função que cria o registro com os parametros especificados
                        data: {
                            name: name,
                            email: email,
                            password: hashPassword,
                            UserAccess: {
                                create: {
                                    Access: {
                                        connect: {
                                            name: accessName
                                        }
                                    }
                                }
                            }
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            UserAccess: {
                                select: {
                                    Access: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    })];
            case 4:
                user = _b.sent();
                return [2 /*return*/, res.status(201).json(user)]; // resposta retornarda
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).json(error_1.message)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getAllUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.prisma.user.findMany({
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            UserAccess: {
                                select: {
                                    Access: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            },
                            store: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    })];
            case 1:
                users = _a.sent();
                if (!users) {
                    return [2 /*return*/, res.status(204).json({ message: "not content" })];
                }
                return [2 /*return*/, res.status(200).json(users)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status.json(error_2.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUniqueUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: {
                            id: id
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            UserAccess: {
                                select: {
                                    Access: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            },
                            Store: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(203).json({ message: "Usuario não está cadastrado" })];
                }
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(400).json(error_3.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserMany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.prisma.user.deleteMany()];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).son({ message: "Todos deletados" })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(400).json(error_4.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };