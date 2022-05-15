import { UserInterface } from "./user";

enum MatchResult {
    P1,
    P2,
    Draw
}

export interface MatchInterface {
    P1: UserInterface
    P2: UserInterface
    result: MatchResult
}