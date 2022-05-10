"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserModelSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    friends: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "UserSchema",
        default: []
    }
});
// Compile model from schema
exports.UserModel = (0, mongoose_1.model)('UserModel', UserModelSchema);
//# sourceMappingURL=user.model.js.map