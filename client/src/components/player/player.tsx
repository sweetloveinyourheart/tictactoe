import { FunctionComponent, useEffect, useRef, useState } from "react";
import Countdown from 'react-countdown';
import { useSocket } from "../../contexts/socket";
import { UserInterface } from "../../types/user";
import { TicListenerPayload } from "../playground/playground";
import './player.css'

interface PlayerProps {
    players: { P1: UserInterface | undefined, P2: UserInterface | undefined }
    you: string
    initTurn: string
    icon: number
}

const Player: FunctionComponent<PlayerProps> = ({ players, you, initTurn, icon }) => {
    const [timer, setTimer] = useState(0)
    const [turn, setTurn] = useState<string>("")

    const { socket } = useSocket()

    useEffect(() => {
        setTurn(initTurn)
    }, [players])


    useEffect(() => {
        socket?.on('tic-listener', (payload: TicListenerPayload) => {

            if (payload.player === players.P1?._id) {
                setTimer(Date.now() + 60000)
                setTurn(players.P2?._id ?? "")
                return;
            } else {
                setTimer(0)
                setTurn(players.P1?._id ?? "")
            }
        })
    }, [socket])

    const showIcon = (playerId: string | undefined): JSX.Element => {
        if (playerId === you) {
            return (
                <div className="user__icon">
                    {icon === 0
                        ? (<i className="far fa-circle o"></i>)
                        : (<i className="fas fa-times x"></i>)
                    }
                </div>
            )
        }

        return (
            <div className="user__icon">
                {icon !== 0
                    ? (<i className="far fa-circle o"></i>)
                    : (<i className="fas fa-times x"></i>)
                }
            </div>
        )
    }

    const renderer = ({ hours, minutes, seconds, completed }: { hours: number, minutes: number, seconds: number, completed: boolean }) => {
        if (completed) {
            // Render a completed state
            return <span> Time Out ! </span>
        } else {
            // Render a countdown
            return <span>{seconds}</span>;
        }
    };

    return (
        <div className="player">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-4">
                        <div className="user ">
                            <div className={
                                players.P1?._id === turn
                                    ? "user__avatar user__avatar--active"
                                    : "user__avatar"
                            }>
                                {players.P1?.fullname[0]}
                            </div>
                            <div className="user__fullname">
                                <p>{players.P1?.fullname}</p>
                                <span>TTP: {players.P1?.TTP}</span>
                            </div>
                            {showIcon(players.P1?._id)}
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="timer">
                            <Countdown date={timer} renderer={renderer} />
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="user user--right">
                            <div className={
                                players.P2?._id === turn
                                    ? "user__avatar user__avatar--active"
                                    : "user__avatar"
                            }>
                                {players.P2?.fullname[0]}
                            </div>
                            <div className="user__fullname">
                                <p>{players.P2?.fullname}</p>
                                <span>TTP: {players.P2?.TTP}</span>
                            </div>
                            {showIcon(players.P2?._id)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;