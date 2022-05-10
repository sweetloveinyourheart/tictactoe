"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authGuard(req, res, next) {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        if (!token)
            return res.sendStatus(401);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
        next();
    }
    catch (error) {
        return res.sendStatus(403);
    }
}
exports.authGuard = authGuard;
//# sourceMappingURL=jwt.js.map