import { FunctionComponent } from "react";
import { UserInterface } from "../../types/user";
import './player.css'

interface PlayerProps {
    players: { P1: UserInterface | undefined, P2: UserInterface | undefined }
}

const Player: FunctionComponent<PlayerProps> = ({ players }) => {
    return (
        <div className="player">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-4">
                        <div className="user ">
                            <div className="user__avatar">
                                {players.P1?.fullname[0]}
                            </div>
                            <div className="user__fullname">
                                {players.P1?.fullname}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="user user--right">
                        <div className="user__avatar">
                                {players.P2?.fullname[0]}
                            </div>
                            <div className="user__fullname">
                                {players.P2?.fullname}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;