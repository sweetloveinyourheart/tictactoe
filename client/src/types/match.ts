import { UserInterface } from "./user";

enum MatchResult {
    P1,
    P2,
    Draw
}

export interface MatchInterface {
    _id: string
    P1: UserInterface
    P2: UserInterface
    timeStamp: Date
    result: MatchResult
}