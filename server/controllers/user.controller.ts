import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt"

interface Profile {
    _id: string
    username: string
    fullname: string
    email?: string
}

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body

        if (!data) throw new Error()

        // Check account existing
        const isExist = await UserModel.findOne({ username: data.username })
        if(isExist) throw new Error("User already exist !")

        //Hasing password
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt)

        const newUser = await UserModel.create({
            ...data,
            password: hashedPassword
        })
        const savedUser = await newUser.save()

        return res.status(201).json({
            data: savedUser,
            error: null
        })
    } catch (error) {
        return res.status(400).json({
            data: null,
            error
        })
    }
}

export const getProfile = async (req: Request & { userId?: string }, res: Response) => {
    try {
        const userId = req.userId
        if (!userId) throw new Error()

        const user = await UserModel.findById(userId)
        if (!user) return res.status(404).json({ data: null })

        return res.status(200).json({
            data: {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                TTP: user.TTP
            },
            error: null
        })
    } catch (error) {
        return res.status(401).json({
            data: null,
            error: "Unauthorized !"
        })
    }
}


export const addFriend = async (req: Request & { userId?: string }, res: Response) => {
    try {
        const { friendId } = req.params
        await UserModel.findByIdAndUpdate(req.userId, { $push: { friends: friendId } })

        return res.status(200).json({
            data: {
                message: "Friend added !"
            },
            error: null
        })

    } catch (error) {
        return res.status(400).json({
            data: null,
            error: "Add friend failed !"
        })
    }
}

export const getFriendList = async (req: Request & { userId?: string }, res: Response) => {
    try {
        const user = await UserModel.findById(req.userId).populate('friends')
        return res.status(200).json({
            data: {
                friends: user.friends
            },
            error: null 
        })

    } catch (error) {
        return res.sendStatus(404)
    }
}