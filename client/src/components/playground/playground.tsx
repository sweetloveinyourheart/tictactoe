import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../contexts/socket";
import "./playground.css"

interface PlaygroundProps {
    icon: number
    matchId: string
    initTurn: string
    you: string
}

export interface TicListenerPayload {
    position: {
        x: number
        y: number
    }
    player: string
    icon: number
}


const Playground: FunctionComponent<PlaygroundProps> = ({ icon, matchId, initTurn, you }) => {
    const [caro, setCaro] = useState([
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ])
    const [count, setCount] = useState(0)
    const [turn, setTurn] = useState<string>("")
    const [winner, setWinner] = useState<number | undefined>();

    const { socket } = useSocket()
    const navigate = useNavigate()

    useEffect(() => {
        socket?.emit('init-match', { matchId })
        setTurn(initTurn)
    }, [])

    useEffect(() => {
        socket?.on('tic-listener', (payload: TicListenerPayload) => {
            if (payload.player !== you) {
                let items = caro
                items[payload.position.x][payload.position.y] = payload.icon
                setCaro(items)
                setTurn(you)
                return;
            }
        })

        socket?.on('result-listener', (payload) => {
            setWinner(payload.winner)
        })
    }, [socket])

    useEffect(() => {
        // Across cheking
        for (let i = 0; i < 3; i++) {
            if (caro[i][0] === -1 || caro[i][1] === -1 || caro[i][2] === -1) {
                // do nothing
            }
            else if (caro[i][0] === caro[i][1] && caro[i][1] === caro[i][2]) {
                socket?.emit("match-result", {
                    matchId,
                    winner: caro[i][0]
                })
                return;
            }
        }
        // Down cheking
        for (let i = 0; i < 3; i++) {
            if (caro[0][i] === -1 || caro[1][i] === -1 || caro[2][i] === -1) {
                // do nothing
            }
            else if (caro[0][i] === caro[1][i] && caro[1][i] === caro[2][i]) {
                socket?.emit("match-result", {
                    matchId,
                    winner: caro[0][i]
                })
                return;
            }
        }

        // diagnol checking
        if (
            caro[1][1] === -1
        ) {
            // do nothing
        }
        else if (caro[0][0] === caro[1][1] && caro[1][1] === caro[2][2]) {
            socket?.emit("match-result", {
                matchId,
                winner: caro[0][0]
            })
        } else if (caro[0][2] === caro[1][1] && caro[1][1] === caro[2][0]) {
            socket?.emit("match-result", {
                matchId,
                winner: caro[0][2]
            })
        }

        // Draw (5 is the maximum value for picking)
        if (count === 5) {
            socket?.emit("match-result", {
                matchId,
                winner: -1
            })
        }

    }, [caro, turn])

    const onCaroClick = useCallback((x: number, y: number) => {
        if (turn === you) {
            let items = caro
            items[x][y] = icon
            setCaro(items)
            setCount(s => s + 1)
            setTurn("")
            socket?.emit('tic', { position: { x, y }, icon, matchId })
        }
    }, [caro, count, icon, you, socket, turn])

    const renderCaroTable = () => {
        return caro.map((el, x) => {
            return (
                <div className="caro-row" key={x}>
                    {el.map((elm, y) => {
                        if (elm < 0)
                            return (
                                <div className="caro-col" key={y} onClick={() => onCaroClick(x, y)}></div>
                            )

                        if (elm === 0)
                            return (
                                <div className="caro-col caro-col--o" key={y}>
                                    <i className="far fa-circle"></i>
                                </div>
                            )

                        return (
                            <div className="caro-col caro-col--x" key={y}>
                                <i className="fas fa-times"></i>
                            </div>
                        )
                    })})
                </div>
            )
        })
    }

    return (
        <section className="playground">
            <div className="container">
                <div className="area">
                    <div className="caro">
                        {winner !== undefined
                            ? (
                                winner !== -1
                                    ? (
                                        <div className="winner">
                                            {winner === icon
                                                ? (
                                                    <div className="winner-icon">
                                                        <img src="/wincup.png" alt="#" />
                                                        <p>You win !</p>
                                                        <div className="d-flex justify-content-center">
                                                            <button onClick={() => navigate('/match')}>Back to looby</button>
                                                        </div>
                                                    </div>
                                                )
                                                : (
                                                    <div className="winner-icon">
                                                        <img src="/defeated.png" alt="#" />
                                                        <p>You lose !</p>
                                                        <div className="d-flex justify-content-center">
                                                            <button onClick={() => navigate('/match')}>Back to looby</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                    : (
                                        <div className="winner-icon">
                                            <img src="/draw.png" alt="#" />
                                            <p>Draw !</p>
                                            <div className="d-flex justify-content-center">
                                                <button onClick={() => navigate('/match')}>Back to looby</button>
                                            </div>
                                        </div>
                                    )
                            )
                            : renderCaroTable()
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Playground;