import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { UserInterface } from "../../types/user";
import "./top-player.css"

interface TopPlayerComponentProps { }

const TopPlayerComponent: FunctionComponent<TopPlayerComponentProps> = () => {
    const [players, setPlayers] = useState<UserInterface[]>([])

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/user/topPlayer')
            if (data.data && !data.error) {
                setPlayers(data.data)
            }
        })()
    }, [])

    const renderPlayer = () => {
        return players.map((player, index) => {
            if (index <= 2) {
                return (
                    <div className="friend-data" key={index}>
                        <div className="friend-data__detail">
                            <div className="friend-avatar">
                                <img src={`/top${index + 1}.png`} alt="" />
                            </div>
                            <div className="friend-data-info">
                                <p className="friend-name"> {player.fullname} </p>
                                <span>{player.username}</span>
                            </div>
                        </div>

                        <div className="friend-data__TTP">
                            <p>TTP: {player.TTP}</p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="friend-data friend-data--border" key={index}>
                        <div className="friend-data__detail">
                            <div className="friend-avatar friend-avatar--border">
                                {index + 1}
                            </div>
                            <div className="friend-data-info">
                                <p className="friend-name"> {player.fullname} </p>
                                <span>{player.username}</span>
                            </div>
                        </div>

                        <div className="friend-data__TTP">
                            <p>TTP: {player.TTP}</p>
                        </div>
                    </div>
                )
            }
        })
    }

    return (
        <section className="top-player">
            <div className="container">
                <div className='page-name'> TOP PLAYER </div>
                <div className="player-area">
                    {renderPlayer()}
                </div>
            </div>
        </section>
    );
}

export default TopPlayerComponent;