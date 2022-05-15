import { UserModel } from "../models/user.model";
import { Server, Socket } from "socket.io";
import { MatchModel } from "../models/match";

interface InvitePayload {
    friend: string
    inviter: string
}

interface MatchAcceptPayload {
    roomId: string
    competitor: string
}

export default function socketHandlers(io: Server, socket: Socket & { userId?: string }) {
    socket.join(socket.userId)

    // invite
    socket.on('invite-request', async (payload: InvitePayload) => {
        const user = await UserModel.findOne({ username: payload.friend })

        if (!user) return socket.emit('invite-response', {
            message: 'No friend suggestion !',
            data: null
        })

        io.to(user._id.toString()).emit('match-request', {
            message: `${payload.inviter} invite you to join a match ^^!`,
            data: { inviter: payload.inviter, roomId: socket.userId }
        })

        socket.emit('invite-response', {
            message: 'Friend invited !',
            data: { accepter: user.fullname }
        })
    })

    socket.on('match-accept', async (payload: MatchAcceptPayload) => {
        socket.join(payload.roomId)

        const newMatch = new MatchModel({
            P1: payload.roomId,
            P2: socket.userId
        })

        await newMatch.save()

        socket.emit('match-response', {
            message: 'Match accepted !',
            data: {
                matchId: newMatch._id
            }
        })

        io.to(payload.roomId).emit('match-response', {
            message: 'Match accepted !',
            data: {
                matchId: newMatch._id
            }
        })
    })

    socket.on('match-denied', ({ roomId }) => {
        io.to(roomId).emit('match-response', {
            message: 'Match rejected !',
            data: null
        })
    })

    // playground
    


}