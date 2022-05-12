import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SignIn from "../components/auth/signin"
import SignUp from "../components/auth/signup"
import Header from "../components/header/header"
import { useAuth } from "../contexts/auth"

enum AuthState {
    SignIn,
    SignUp
}

function Auth() {
    const [authState, setAuthState] = useState<AuthState>(AuthState.SignIn)

    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        if(user) {
            navigate("/user")
        }
    }, [user])


    const changeAuthState = useCallback(() => {
        authState === AuthState.SignIn ? setAuthState(AuthState.SignUp) : setAuthState(AuthState.SignIn)
    }, [authState])

    return (
        <>
            <Header />
            {authState === AuthState.SignIn
                ? <SignIn changeState={changeAuthState}/>
                : <SignUp changeState={changeAuthState}/>
            }
        </>
    )
}

export default Auth