import { Schema, model, Document } from "mongoose"
import { UserDocument } from "./user.model";

export type RefreshTokenDocument = Document & {
    user: UserDocument
    token: string
}

const RefreshTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },

    token: {
        type: String,
        required: true
    }

});

// Compile model from schema
export const RefreshTokenModel = model<RefreshTokenDocument>('RefreshTokenModel', RefreshTokenSchema);