import { FunctionComponent } from "react";
import "./header.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

interface HeaderProps { }

const Header: FunctionComponent<HeaderProps> = () => {
    const navigate = useNavigate();
    const { user } = useAuth()

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="logo" onClick={() => navigate('/')}>
                            <img src="https://htmldemo.net/bonx/bonx/assets/img/logo/logo.webp" alt="#" />
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <nav className="navigation">
                            <Link to="/"> Home </Link>
                            <Link to="/match"> Match </Link>
                            <Link to="/"> Guide </Link>
                            <Link to="/"> Top Player </Link>
                        </nav>
                    </div>
                    <div className="col-xl-4">
                        <div className="auth">
                            {user
                                ? (
                                    <div className="user" onClick={() => navigate('/user')}>
                                        <div className="user__avatar">
                                            {user.fullname[0]}
                                        </div>
                                        <div className="user__fullname">
                                            {user.fullname}
                                        </div>
                                    </div>
                                )
                                : (
                                    <button onClick={() => navigate('/authentication')}>
                                        <span>Sign In</span>
                                        <i className="far fa-arrow-alt-circle-right"></i>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;