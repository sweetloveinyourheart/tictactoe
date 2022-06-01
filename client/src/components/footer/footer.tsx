import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./footer.css"

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 col-xl-4">
                        <div className="footer-content">
                            <div className="footer-item">
                                <div className="logo">
                                    <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654084749/tictactoe/logo_wmkmy5.png" alt="#" />
                                </div>
                                <div className="footer-item__text">
                                    <p>Contact us with our social media, facebook, instagram, twitter and more</p>
                                </div>
                                <div className="footer-item__social">
                                    <i className="fab fa-facebook-square"></i>
                                    <i className="fab fa-instagram"></i>
                                    <i className="fab fa-twitter"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-12 col-lg-4 col-xl-4">
                        <div className="footer-content">

                            <div className="footer-item">
                                <div className="footer-item__title">
                                    <h4>QUICK LINK</h4>
                                </div>
                                <div className="footer-item__text"></div>
                                <div className="footer-item__link">
                                    <Link to={"/home"}> Home Page </Link>
                                </div>
                                <div className="footer-item__link">
                                    <Link to={"/guide"}> Game Guide </Link>
                                </div>
                                <div className="footer-item__link">
                                    <Link to={"/top-player"}> Top Player </Link>
                                </div>
                                <div className="footer-item__link">
                                    <Link to={"/authentication"}> Login Page </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 col-xl-4">
                        <div className="footer-content">

                            <div className="footer-item">
                                <div className="footer-item__title">
                                    <h4>CONTACT</h4>
                                </div>
                                <div className="footer-item__text">
                                    <label> Location: </label>
                                    <p>576 Le Duan - Ea Tam - BMT - DAKLAK</p>
                                </div>
                                <div className="footer-item__text">
                                    <label> Phone: </label>
                                    <p>Developer: 0931910JQK<br />Designer: 0945674000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;