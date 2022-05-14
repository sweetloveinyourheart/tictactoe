import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import Match from "../components/match/match";
import { useAuth } from "../contexts/auth";

export default function MatchPage(): JSX.Element {

    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) navigate('/authentication')
    }, [user])

    return (
        <>
            <Header />
            <Match />
        </>
    )
}