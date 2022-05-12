import { FunctionComponent } from "react";
import "./banner.css"

interface BannerProps { }

const Banner: FunctionComponent<BannerProps> = () => {
    return (
        <section className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-xl-7">
                        <div className="hero-content">
                            <h1>
                                BEST GAME <br />
                                PLAYING TODAY.
                            </h1>
                            <p> Simply text of the printing and typesetting industry. </p>
                            <button>
                                <span>Play now </span>
                                <i className="far fa-arrow-alt-circle-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-xl-5">
                        <div className="hero-img">
                            <img src="https://htmldemo.net/bonx/bonx/assets/img/bg/hero-position-img.webp" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;