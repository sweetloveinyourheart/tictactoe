import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import "./auth.css"

interface SignInProps {
    changeState: () => void
}

const SignIn: FunctionComponent<SignInProps> = ({ changeState }) => {
    const [userState, setUser] = useState<{ username: string, password: string }>({
        username: "",
        password: ""
    })

    const navigate = useNavigate()
    const { user, login, error } = useAuth()

    useEffect(() => {
        if(user) {
            navigate("/")
        }
    }, [user])

    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(userState)
    }

    return (
        <section className="auth-section">
            <div className="container">
                <div className="auth-area">
                    <div className="row justify-content-between">
                        <div className="col-xl-6">
                            <div className="auth-area__image">
                                <img src="https://htmldemo.net/bonx/bonx/assets/img/others/about-thumb.webp" alt="" />
                            </div>
                        </div>
                        <div className="col-xl-5">
                            <div className="auth-area__exec">
                                <h5> LOGIN</h5>
                                <div className={`msg ${error ? "msg--err" : "msg--success"}`}>
                                    {error && error}
                                </div>
                                <form onSubmit={(e) => onLogin(e)} className="auth-form">
                                    <div className="auth-form__input">
                                        <input
                                            type="text"
                                            value={userState.username}
                                            onChange={e => setUser(s => ({ ...s, username: e.target.value }))}
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="auth-form__input">
                                        <input
                                            type="password"
                                            value={userState.password}
                                            onChange={e => setUser(s => ({ ...s, password: e.target.value }))}
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="auth-form__btn">
                                        <button type="submit"> Login </button>
                                    </div>
                                </form>
                                <p onClick={() => changeState()}>
                                    Didn't have account, Signup here
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignIn;