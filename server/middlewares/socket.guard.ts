import jwt from "jsonwebtoken"

export function SocketGuard(socket: any, next: any) {
    if (socket.handshake.query && socket.handshake.query.token) {
        const decoded: any = jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET)
		socket.userId = decoded._id
        next()
    }
    else {
        next(new Error('Authentication error'));
    }
}