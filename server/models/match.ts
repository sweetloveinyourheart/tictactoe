import { Schema, model, Document } from "mongoose"
import { UserDocument } from "./user.model";

export type MatchDocument = Document & {
    P1: UserDocument
    P2: UserDocument
    result: MatchResult
}

enum MatchResult {
    P1,
    P2,
    Draw
}

// collections = table
const MatchModelSchema = new Schema({
    // field = columns
    P1: {
        type: Schema.Types.ObjectId, // data type
        ref: "UserModel"
    },

    P2: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    result: {
        type: String,
        enum: MatchResult,
        default: MatchResult.Draw
    },

    timeStamp: {
        type: Date,
        default: new Date()  
    }
});

// Compile model from schema
export const MatchModel = model<MatchDocument>('MatchModel', MatchModelSchema);