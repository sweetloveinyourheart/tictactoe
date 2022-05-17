import { UserModel } from "../models/user.model";
import { Server, Socket } from "socket.io";
import { MatchModel, MatchResult } from "../models/match";

interface InvitePayload {
    friend: string
    inviter: string
}

interface MatchAcceptPayload {
    roomId: string
    competitor: string
}

interface TicPayload {
    matchId: string
    position: {
        x: number
        y: number
    }
    icon: number
}

interface MatchResultPayload {
    matchId: string
    winner: MatchResult
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
    socket.on('init-match', async ({ matchId }) => {
        const match = await MatchModel.findById(matchId).populate(['P1', 'P2'])
        if (match.P1._id.toString() === socket.userId || match.P2._id.toString() === socket.userId) {
            socket.join(matchId)
        }
    })

    socket.on('tic', ({ matchId, position, icon }: TicPayload) => {
        io.to(matchId).emit('tic-listener', {
            position,
            player: socket.userId,
            icon
        })
    })

    socket.on('match-result', async ({ matchId, winner }: MatchResultPayload) => {
        const { P1, P2 } = await MatchModel.findByIdAndUpdate(matchId, {
            result: winner
        }).populate(['P1', 'P2'])

        // Update TTP
        // 10 point each match
        if(winner !== -1) {
            if (winner === 0) {
                await UserModel.findByIdAndUpdate(P1._id, {
                    TTP: P1.TTP + 10
                })
            } else {
                await UserModel.findByIdAndUpdate(P2._id, {
                    TTP: P2.TTP + 10
                })
            }
        }

        io.to(matchId).emit('result-listener', { winner })
    })
}