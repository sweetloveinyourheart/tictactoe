import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Player from "../components/player/player";
import Playground from "../components/playground/playground";
import { useAuth } from "../contexts/auth";
import { MatchInterface } from "../types/match";
import { UserInterface } from "../types/user";


export default function PlayGroundPage() {
    const [icon, setIcon] = useState(-1)
    const [players, setPlayers] = useState<{ P1: UserInterface | undefined, P2: UserInterface | undefined }>({
        P1: undefined,
        P2: undefined
    })

    const { search } = useLocation()
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                if(!user || search.length === 0) throw new Error()

                const { data } = await axios.get(`/api/match/init${search}`)
                const match: MatchInterface = data.data

                if (match.P1.username === user?.username)
                    setIcon(1)
                else
                    setIcon(0)

                setPlayers({
                    P1: match.P1,
                    P2: match.P2
                })

            } catch (error) {
                navigate('/match')
            }
        })()
    }, [])

    return (
        <div style={{
            background: "url(https://htmldemo.net/bonx/bonx/assets/img/bg/body-bg2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll"
        }}>
            <Player players={players}/>
            <Playground icon={icon} />
        </div>
    )
}