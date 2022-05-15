import { Schema, model, Document } from "mongoose"

export type UserDocument = Document & {
    username: string
    password: string
    fullname: string
    email: string
}

const UserModelSchema = new Schema({
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
        required: false
    },

    TTP: {
        type: Number,
        default: 0
    },

    friends: {
        type: [Schema.Types.ObjectId],
        ref: "UserModel",
        default: []
    }

});

// Compile model from schema
export const UserModel = model<UserDocument>('UserModel', UserModelSchema);