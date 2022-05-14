import { FunctionComponent } from "react";
import './player.css'

interface PlayerProps {

}

const Player: FunctionComponent<PlayerProps> = () => {
    return (
        <div className="player">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-4">
                        <div className="user ">
                            <div className="user__avatar">
                                {"B"}
                            </div>
                            <div className="user__fullname">
                                {"Ngọc Bích"}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="user user--right">
                        <div className="user__avatar">
                                {"D"}
                            </div>
                            <div className="user__fullname">
                                {"Dũng Đing"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;