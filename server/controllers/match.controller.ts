import { Request, Response } from "express";
import { MatchModel } from "../models/match";


export const initialMatch = async (req: Request, res: Response) => {
    try {
        const match = await MatchModel.findById(req.query.matchId).populate(["P1", "P2"])
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