import { UserInterface } from "./user";

export enum MatchResult {
    P1 = 0,
    P2 = 1,
    Draw = -1
}

export interface MatchInterface {
    _id: string
    P1: UserInterface
    P2: UserInterface
    timeStamp: Date
    result: MatchResult
}