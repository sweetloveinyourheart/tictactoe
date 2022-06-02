import axios from "axios";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useSocket } from "../../contexts/socket";
import { UserInterface } from "../../types/user";
import Loading from "../loading/loading";
import "./match.css"

interface MatchProps { }

const Match: FunctionComponent<MatchProps> = () => {
    const [isInviting, setIsInviting] = useState<boolean>(false)
    const [friend, setFriend] = useState<string>("")
    const [friendList, setFriendList] = useState<UserInterface[]>([])

    const navigate = useNavigate()
    const { socket } = useSocket()
    const { user } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/user/getFriendList')
                const result = data.data
                if (!result?.error) {
                    setFriendList(result.friends)
                }

            } catch (error) { }
        })()
    }, [])

    useEffect(() => {
        socket?.on('invite-response', (payload) => {
            if (!payload?.data) {
                setIsInviting(false)
            } else {
                setTimeout(() => setIsInviting(false), 60 * 1000)
            }
        })

        socket?.on('match-response', (payload) => {
            if (payload?.data) {
                navigate(`/playground?matchId=${payload.data.matchId}`)
            } else {
                setIsInviting(false)
            }
        })
    }, [socket, navigate])

    const onInviteFriend = useCallback((username?: string) => {
        if (isInviting) return;

        if(username === user?.username || friend === user?.username) return;

        setIsInviting(true)
        setFriend("")

        if (username) {
            socket?.emit('invite-request', { friend: username, inviter: user?.fullname })
            setFriend("")
            return;
        }

        socket?.emit('invite-request', { friend, inviter: user?.fullname })
    }, [friend, isInviting, user?.fullname, user?.username])

    const yasuo = () => {
        return friendList.map((elm, id) => {
            return (
                <div className="friend-data" key={id}>
                    <div className="friend-data__detail">
                        <div className="friend-avatar">
                            {elm.fullname[0]}
                        </div>
                        <div className="friend-data-info">
                            <p className="friend-name"> {elm.fullname} </p>
                            <span className="friend-TTP">TTP: {elm.TTP}</span>
                        </div>
                    </div>

                    <div className="friend-data__invite">
                        {!isInviting
                            ? (
                                <button onClick={() => onInviteFriend(elm.username)}>
                                    Challenge Now !
                                </button>
                            )
                            : (
                                <div className="d-flex justify-content-center"><Loading /></div>
                            )
                        }
                    </div>
                </div>
            )
        })
    }

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
                <div className="friend-area">
                    <h1> Friend List </h1>
                    <div className="friend-list">
                        {yasuo()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Match;