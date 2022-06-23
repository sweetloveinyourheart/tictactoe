import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { MatchInterface, MatchResult } from "../../types/match";
import "./match-history.css"

interface HistoryComponentProps {

}

const HistoryComponent: FunctionComponent<HistoryComponentProps> = () => {
    const [matches, setMatches] = useState<MatchInterface[]>([])

    const { user } = useAuth()

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/match/history')
            if (data.data && !data.error) {
                setMatches(data.data)
            }
        })()
    }, [])

    const checkWinner = (match: MatchInterface): JSX.Element => {
        if (match.result == MatchResult.P1) {
            if (match.P1._id == user?._id) {
                return <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654081158/tictactoe/Pngtree_win_popup_victory_dialog_with_6542902_x5n8vf.png" width={150} alt="" />
            } else {
                return <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654081158/tictactoe/Pngtree_lose_popup_loser_dialog_defeat_6542904_togbva.png" width={150} alt="" />
            }
        }

        if (match.result == MatchResult.P2) {
            if (match.P2._id == user?._id) {
                return <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654081158/tictactoe/Pngtree_win_popup_victory_dialog_with_6542902_x5n8vf.png" width={150} alt="" />
            } else {
                return <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654081158/tictactoe/Pngtree_lose_popup_loser_dialog_defeat_6542904_togbva.png" width={150} alt="" />
            }
        }

        return <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654080697/tictactoe/draw_dsisqc.png" width={150} alt="" />
    }

    const renderMatch = () => {
        return matches.map((match, index) => {
            return (
                <div className="history-item" key={index}>
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <div className="history-item__player">
                                <p> {match.P1.fullname} </p>
                                <span> {match.P1.username} </span>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="history-item__icon">
                                {checkWinner(match)}
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="history-item__player history-item__player--right">
                                <p> {match.P2.fullname} </p>
                                <span> {match.P2.username} </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <section className="history">
            <div className="container">
                <div className='page-name'> MATCH HISTORY </div>
                <div className="history-area">
                    {renderMatch()}
                </div>
            </div>
        </section>
    );
}

export default HistoryComponent;