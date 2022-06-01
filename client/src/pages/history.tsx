import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import HistoryComponent from "../components/match-history/match-history";
import { useAuth } from "../contexts/auth";


function MatchHistoryPage() {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) navigate('/authentication')
    }, [user])
    
    return (  
        <>
            <Header />
            <HistoryComponent />
        </>
    );
}

export default MatchHistoryPage;