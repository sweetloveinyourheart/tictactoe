import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt"
import { RefreshTokenModel } from "../models/refreshToken.model";
import { generateTokens } from "../helpers/jwt.helper";

interface LoginData {
    username: string
    password: string
}

export const login = async (req: Request, res: Response) => {
    try {
        const data: LoginData = req.body
        //checking password
        const user = await UserModel.findOne({ username: data.username })
        if (!user) throw Error("User isn't exist !")

        const isValid = await bcrypt.compare(data.password, user.password)
        if (!isValid) throw Error("Username or password is not correct !")

        //if the user valid, generate tokens
        const { _id, username } = user
        const { accessToken, refreshToken } = generateTokens({ _id, username })

        //store rf token to DB
        const storedToken = await RefreshTokenModel.findOneAndUpdate({ user: _id }, { token: refreshToken })
        if (!storedToken) {
            const newRfToken = await RefreshTokenModel.create({ user: _id, token: refreshToken })
            await newRfToken.save()
        }

        return res.status(200).cookie("refreshToken", refreshToken).json({
            accessToken
        })

    } catch (error) {
        return res.status(401).json({
            data: null,
            error: "Unauthorized"
        })
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const extractedToken = req.cookies['refreshToken']
        if (!extractedToken) return res.sendStatus(401)

        const rfTokenStored = await (await RefreshTokenModel.findOne({ token: extractedToken })).populate("user")
        if (!rfTokenStored) return res.sendStatus(403)

        const isValid = await jwt.verify(extractedToken, process.env.JWT_SECRET)
        if (!isValid) return res.sendStatus(403)

        const { accessToken, refreshToken } = generateTokens({ _id: rfTokenStored.user._id, username: rfTokenStored.user.username })

        //store rf token to DB
        await RefreshTokenModel.findOneAndUpdate({ user: rfTokenStored.user._id }, { token: refreshToken })

        return res.status(200).cookie("refreshToken", refreshToken).json({
            accessToken
        })

    } catch (error) {
        return res.status(403).json({
            data: null,
            error: "Request failed !"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const extractedToken = req.cookies['refreshToken']
        if (!extractedToken) return res.sendStatus(401)
        
        await RefreshTokenModel.findOneAndUpdate({ token: extractedToken }, { token: null })
        return res.status(204).json({
            data: {
                message: "Logout successfully !"
            }
        })
    } catch (error) {
        return res.status(403).json({
            data: null,
            error: "Request failed !"
        })
    }
}