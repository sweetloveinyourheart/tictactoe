import { FunctionComponent, useEffect, useState } from "react";
import "./header.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

interface HeaderProps { }

const Header: FunctionComponent<HeaderProps> = () => {
    const [navBgColor, setBgColor] = useState("transparent")
    const navigate = useNavigate();
    const { user, logout } = useAuth()
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 50 ? setBgColor("rgba(20, 14, 56, 0.9)") : setBgColor("transparent")
        });
        return () => {
            window.removeEventListener("scroll", () => {
                window.scrollY > 50 ? setBgColor("rgba(20, 14, 56, 0.9)") : setBgColor("transparent")
            });
        };
    }, [])

    return (
        <header className="header" style={{ backgroundColor: navBgColor }}>
            <div className="container">
                <div className="row">
                    <div className="col-8 col-md-4 col-lg-4 col-xl-4">
                        <div className="logo" onClick={() => navigate('/')}>
                            <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654084749/tictactoe/logo_wmkmy5.png" alt="#" />
                        </div>
                    </div>
                    <div className="d-none col-1 d-md-block col-md-6 col-lg-5 col-xl-4">
                        <nav className="navigation">
                            <Link to="/"> Home </Link>
                            <Link to="/match"> Match </Link>
                            <Link to="/guide"> Guide </Link>
                            <Link to="/top-player"> Top Player </Link>
                        </nav>
                    </div>
                    <div className="col-4 col-md-2 col-lg-3 col-xl-4">
                        <div className="auth-nav">
                            <div className="auth">
                                {user
                                    ? (
                                        <div className="user">
                                            <div className="user__avatar">
                                                {/* {user.fullname[0]} */}
                                                <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654080696/tictactoe/avater2_vrvwmo.jpg" alt="" />
                                            </div>
                                            <div className="d-none d-md-block user__fullname">
                                                {user.fullname}
                                            </div>
                                            <div className="user-dropdown">
                                                <div className="user-dropdown__item" onClick={() => navigate('/user')}>
                                                    <i className="far fa-user-circle"></i>
                                                    <span> Thông tin tài khoản </span>
                                                </div>
                                                <div className="user-dropdown__item" onClick={() => navigate('/match-history')}>
                                                    <i className="fas fa-crown"></i>
                                                    <span> Xem lịch sử đấu </span>
                                                </div>
                                                <div className="user-dropdown__item" onClick={() => logout()}>
                                                    <i className="fas fa-sign-out-alt"></i>
                                                    <span> Đăng xuất </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <button onClick={() => navigate('/authentication')}>
                                            <span className="d-none d-lg-block">Sign In</span>
                                            <i className="far fa-arrow-alt-circle-right"></i>
                                        </button>
                                    )
                                }
                            </div>
                            <div className="d-block d-md-none toggle" onClick={() => setMenuOpen(s => !s)}>
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>
                    </div>
                    {isMenuOpen
                        && (
                            <div className="col-12 d-md-block col-lg-3 col-xl-4">
                                <nav className="navigation navigation--dropdown">
                                    <Link to="/"> Home </Link>
                                    <Link to="/match"> Match </Link>
                                    <Link to="/guide"> Guide </Link>
                                    <Link to="/top-player"> Top Player </Link>
                                </nav>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;