import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import Axios from 'axios'

interface SignUpProps {
    changeState: () => void
}

interface SignUpForm {
    username: string
    password: string
    retypePassword: string
    fullname: string
    email: string
}

const SignUp: FunctionComponent<SignUpProps> = ({ changeState }) => {
    const [form, setForm] = useState<SignUpForm>({
        username: "",
        password: "",
        retypePassword: "",
        fullname: "",
        email: ""
    })
    const [error, setError] = useState<string | null>(null)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)

    function resetForm() {
        setForm({
            username: "",
            password: "",
            retypePassword: "",
            fullname: "",
            email: ""
        })
    }

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setForm(s => ({
            ...s,
            [name]: value
        }))
    }

    const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { username, password, retypePassword, fullname, email } = form
        // form validation checking
        if (username.length < 2) return setError("Username must be at least 2 character !")
        if (password.length < 6) return setError("Password must be at least 6 character !")
        if (password !== retypePassword) return setError("Retype password is not match !")
        if (fullname.length < 1) return setError("Fullname field cannot empty !")
        setError(null)

        // API trigged
        const data = { username, password, fullname, email: email.length === 0 ? undefined : email }

        const res = await Axios.post('/api/user/register', data)
        if(res.data.error) {
            return setError(res.data.error)
        }

        resetForm()
        setSuccessMsg("Account registed, Let's login now !")
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
                                <h5> SIGNUP </h5>
                                <div className={`msg ${error ? "msg--err" : "msg--success"}`}>
                                    {error && error}
                                    {successMsg && successMsg}
                                </div>
                                <form onSubmit={(e) => onHandleSubmit(e)} className="auth-form">
                                    <div className="auth-form__input">
                                        <input
                                            type="text"
                                            placeholder="Username*"
                                            name="username"
                                            value={form.username}
                                            onChange={e => onHandleChange(e)}
                                        />
                                    </div>
                                    <div className="auth-form__input">
                                        <input
                                            type="password"
                                            placeholder="Password*"
                                            name="password"
                                            value={form.password}
                                            onChange={e => onHandleChange(e)}
                                        />
                                    </div>
                                    <div className="auth-form__input">
                                        <input
                                            type="password"
                                            placeholder="Retype password*"
                                            value={form.retypePassword}
                                            name="retypePassword"
                                            onChange={e => onHandleChange(e)}
                                        />
                                    </div>
                                    <div className="auth-form__input">
                                        <input
                                            type="text"
                                            placeholder="Your name*"
                                            name="fullname"
                                            value={form.fullname}
                                            onChange={e => onHandleChange(e)}
                                        />
                                    </div>
                                    <div className="auth-form__input">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={form.email}
                                            onChange={e => onHandleChange(e)}
                                        />
                                    </div>
                                    <div className="auth-form__btn">
                                        <button type="submit"> Signin </button>
                                    </div>
                                </form>
                                <p onClick={() => changeState()}>
                                    Already have account, Login here
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;