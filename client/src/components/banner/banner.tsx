import { FunctionComponent } from "react";
import "./banner.css"
//@ts-ignore
import { Fade, Zoom } from 'react-reveal'
import { useNavigate } from "react-router-dom";

interface BannerProps { }

const Banner: FunctionComponent<BannerProps> = () => {

    const navigate = useNavigate()

    return (
        <section className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-xl-7">
                        <Fade>
                            <div className="hero-content">
                                <h1>
                                    BEST GAME <br />
                                    PLAYING TODAY.
                                </h1>
                                <p> Simply text of the printing and typesetting industry. </p>
                                <div className="hero-content__btn">
                                    <button onClick={() => navigate('/match')}>
                                        <span>Play now </span>
                                        <i className="far fa-arrow-alt-circle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="col-xl-5">
                        <Zoom>
                            <div className="hero-img">
                                <img src="https://htmldemo.net/bonx/bonx/assets/img/bg/hero-position-img.webp" alt="" />
                            </div>
                        </Zoom>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;