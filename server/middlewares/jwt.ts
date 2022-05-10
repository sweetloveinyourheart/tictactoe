import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function authGuard(req: Request & { userId: string }, res: Response, next: NextFunction) {
	try {
		const authHeader = req.header('Authorization')
		const token = authHeader && authHeader.split(' ')[1]

		if (!token) return res.sendStatus(401)

		const decoded: any = jwt.verify(token, process.env.JWT_SECRET)

		req.userId = decoded._id
		next()
	} catch (error) {

		return res.sendStatus(403)
	}
}