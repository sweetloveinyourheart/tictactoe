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
exports.logout = exports.refreshToken = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const refreshToken_model_1 = require("../models/refreshToken.model");
const jwt_helper_1 = require("../helpers/jwt.helper");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        //checking password
        const user = yield user_model_1.UserModel.findOne({ username: data.username });
        if (!user)
            throw Error("User isn't exist !");
        const isValid = yield bcrypt_1.default.compare(data.password, user.password);
        if (!isValid)
            throw Error("Username or password is not correct !");
        //if the user valid, generate tokens
        const { _id, username } = user;
        const { accessToken, refreshToken } = (0, jwt_helper_1.generateTokens)({ _id, username });
        //store rf token to DB
        const storedToken = yield refreshToken_model_1.RefreshTokenModel.findOneAndUpdate({ user: _id }, { token: refreshToken });
        if (!storedToken) {
            const newRfToken = yield refreshToken_model_1.RefreshTokenModel.create({ user: _id, token: refreshToken });
            yield newRfToken.save();
        }
        return res.status(200).cookie("refreshToken", refreshToken).json({
            accessToken
        });
    }
    catch (error) {
        return res.status(404).json({
            data: null,
            error
        });
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extractedToken = req.cookies['refreshToken'];
        if (!extractedToken)
            return res.sendStatus(401);
        const rfTokenStored = yield (yield refreshToken_model_1.RefreshTokenModel.findOne({ token: extractedToken })).populate("user");
        if (!rfTokenStored)
            return res.sendStatus(403);
        const isValid = yield jsonwebtoken_1.default.verify(extractedToken, process.env.JWT_SECRET);
        if (!isValid)
            return res.sendStatus(403);
        const { accessToken, refreshToken } = (0, jwt_helper_1.generateTokens)({ _id: rfTokenStored.user._id, username: rfTokenStored.user.username });
        //store rf token to DB
        yield refreshToken_model_1.RefreshTokenModel.findOneAndUpdate({ user: rfTokenStored.user._id }, { token: refreshToken });
        return res.status(200).cookie("refreshToken", refreshToken).json({
            accessToken
        });
    }
    catch (error) {
        return res.status(403).json({
            data: null,
            error: "Request failed !"
        });
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extractedToken = req.cookies['refreshToken'];
        if (!extractedToken)
            return res.sendStatus(401);
        yield refreshToken_model_1.RefreshTokenModel.findOneAndUpdate({ token: extractedToken }, { token: null });
        return res.status(204).json({
            data: {
                message: "Logout successfully !"
            }
        });
    }
    catch (error) {
        return res.status(403).json({
            data: null,
            error: "Request failed !"
        });
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map