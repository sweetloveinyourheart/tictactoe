"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
const mongoose_1 = require("mongoose");
const RefreshTokenSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    token: {
        type: String,
        required: true
    }
});
// Compile model from schema
exports.RefreshTokenModel = (0, mongoose_1.model)('RefreshTokenModel', RefreshTokenSchema);
//# sourceMappingURL=refreshToken.model.js.map