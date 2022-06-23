import { Request, Response } from "express";
import { MatchModel } from "../models/match";


export const initialMatch = async (req: Request, res: Response) => {
    try {
        const match = await MatchModel.findById(req.query.matchId).populate(["P1", "P2"])

        if (match.completed) {
            return res.status(404).json({
                data: null,
                error: "Match completed!"
            })
        }

        return res.status(200).json({
            data: match,
            error: null
        })
    } catch (error) {
        return res.status(404).json({
            data: null,
            error: "Cannot find this match !"
        })
    }
}

export const getMatchHistory = async (req: Request & { userId?: string }, res: Response) => {
    try {
        const invitedMatch = await MatchModel.find({ P1: req.userId }).populate(["P1", "P2"]).sort({ timeStamp: -1 })
        const invitingMatch = await MatchModel.find({ P2: req.userId }).populate(["P1", "P2"]).sort({ timeStamp: -1 })

        return res.status(200).json({
            data: [...invitedMatch, ...invitingMatch],
            error: null
        })
    } catch (error) {
        return res.status(404).json({
            data: null,
            error: "An error occurred while update user !"
        })
    }
}