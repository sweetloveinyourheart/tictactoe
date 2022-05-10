"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateTokens({ _id, username }) {
    const accessToken = jsonwebtoken_1.default.sign({ _id, username }, process.env.JWT_SECRET, {
        expiresIn: '5m'
    });
    const refreshToken = jsonwebtoken_1.default.sign({ _id, username }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return {
        accessToken,
        refreshToken
    };
}
exports.generateTokens = generateTokens;
//# sourceMappingURL=jwt.helper.js.map