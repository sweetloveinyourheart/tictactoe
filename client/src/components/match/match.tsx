import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useSocket } from "../../contexts/socket";
import Loading from "../loading/loading";
import "./match.css"

interface MatchProps { }

const Match: FunctionComponent<MatchProps> = () => {
    const [isInviting, setIsInviting] = useState<boolean>(false)
    const [friend, setFriend] = useState<string>("")

    const navigate = useNavigate()
    const { socket } = useSocket()
    const { user } = useAuth()

    useEffect(() => {
        socket?.on('invite-response', (payload) => {
            if (!payload?.data) {
                setIsInviting(false)
            } else {
                setTimeout(() => setIsInviting(false), 60 * 1000)
            }
        })

        socket?.on('match-response', (payload) => {
            if(payload?.data) {
                navigate(`/playground?matchId=${payload.data.matchId}`)
            } else {
                setIsInviting(false)
            }
        })
    }, [socket, navigate])

    const onInviteFriend = useCallback((username?: string) => {
        if (isInviting) return;

        setIsInviting(true)
        setFriend("")

        if (username) {
            socket?.emit('invite-request', { friend: username, inviter: user?.fullname })
            setFriend("")
            return;
        }

        socket?.emit('invite-request', { friend, inviter: user?.fullname })
    }, [friend, isInviting, user?.fullname])

    return (
        <section className="match">
            <div className="container">
                <div className="invite">
                    <div className="invite__box">
                        <h1> Invite Your Friend </h1>

                        {isInviting
                            ? <div className="d-flex justify-content-center"><Loading /></div>
                            : (
                                <form onSubmit={(e) => { e.preventDefault(); onInviteFriend() }} className="invite-box-form">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={friend}
                                        onChange={e => setFriend(e.target.value)}
                                    />
                                    <button type="submit">
                                        <i className="far fa-play-circle"></i>
                                    </button>
                                </form>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Match;