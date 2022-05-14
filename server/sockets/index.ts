import { UserModel } from "../models/user.model";
import { Server, Socket } from "socket.io";

interface InvitePayload {
    friend: string
    inviter: string
}

export default function socketHandlers(io: Server, socket: Socket & { userId?: string }) {
    socket.join(socket.userId)

    socket.on('invite-request', async (payload: InvitePayload) => {
        const user = await UserModel.findOne({ username: payload.friend })

        if (!user) return socket.emit('invite-response', { 
            message: 'No friend suggestion !', 
            data: null 
        })

        io.to(user._id.toString()).emit('match-request', { 
            message: `${payload.inviter} invite you to join a match ^^!`, 
            data: { inviter: payload.inviter } 
        })

        socket.emit('invite-response', { 
            message: 'Friend invited !', 
            data: { accepter: user.fullname } 
        })
    })

    socket.on('match-accept', () => {

    })

    socket.on('match-denied', () => {

    })
}