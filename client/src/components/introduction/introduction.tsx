import { FunctionComponent } from "react";
import "./intro.css";

interface IntroductionProps {

}

const Introduction: FunctionComponent<IntroductionProps> = () => {
    return (
        <section className="intro">
            <div className="container">
                <h1>YOU ARE MOST WELCOME
                    <br />
                    IN GAMING WORLD.
                </h1>
                <div className="row">
                    <div className="col-xl-4">
                        <div className="intro-item" style={{ backgroundImage: "url(https://htmldemo.net/bonx/bonx/assets/img/others/gaming-world-bg1.webp)" }}>
                            <div className="intro-item__img">
                                <img src="https://htmldemo.net/bonx/bonx/assets/img/others/gaming-world1.webp" alt="intro" />
                            </div>
                            <div className="intro-item__descr">
                                <h4>LIVE STREAMING</h4>
                                <p>When unknown printer took type and scrambled it to make type specimen book centuries,</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="intro-item" style={{ backgroundImage: "url(https://htmldemo.net/bonx/bonx/assets/img/others/gaming-world-bg2.webp)" }}>
                            <div className="intro-item__img">
                                <img src="https://htmldemo.net/bonx/bonx/assets/img/others/gaming-world2.webp" alt="intro" />
                            </div>
                            <div className="intro-item__descr">
                                <h4>GAME NEWS</h4>
                                <p>When unknown printer took type and scrambled it to make type specimen book centuries,</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="intro-item" style={{ backgroundImage: "url(	https://htmldemo.net/bonx/bonx/assets/img/others/gaming-world-bg3.webp)" }}>
                            <div className="intro-item__img">
                                <img src="https://htmldemo.net/bonx/bonx/assets/img/others/gaming-world3.webp" alt="intro" />
                            </div>
                            <div className="intro-item__descr">
                                <h4>GAME TOURNAMENTS</h4>
                                <p>When unknown printer took type and scrambled it to make type specimen book centuries,</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Introduction;