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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data)
            throw new Error();
        //Hasing password
        // generate salt to hash password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
        const newUser = yield user_model_1.UserModel.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        const savedUser = yield newUser.save();
        return res.status(201).json({
            data: savedUser,
            error: null
        });
    }
    catch (error) {
        return res.status(400).json({
            data: null,
            error: "Create failed !"
        });
    }
});
exports.register = register;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId)
            throw new Error();
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user)
            return res.status(404).json({ data: null });
        return res.status(200).json({
            data: {
                username: user.username,
                fullname: user.fullname,
                email: user.email
            },
            error: null
        });
    }
    catch (error) {
        return res.status(401).json({
            data: null,
            error: "Unauthorized !"
        });
    }
});
exports.getProfile = getProfile;
//# sourceMappingURL=user.controller.js.map