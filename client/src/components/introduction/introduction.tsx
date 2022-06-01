import { FunctionComponent } from "react";
import "./intro.css";
//@ts-ignore
import { Slide, Fade } from "react-reveal"

interface IntroductionProps {

}

const Introduction: FunctionComponent<IntroductionProps> = () => {
    return (
        <section className="intro">
            <div className="container">
                <Fade>
                    <h1>YOU ARE MOST WELCOME
                        <br />
                        IN GAMING WORLD.
                    </h1>
                </Fade>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 col-xl-4">
                        <Slide bottom>
                            <div className="intro-item" style={{ backgroundImage: "url(https://res.cloudinary.com/tynxcode/image/upload/v1654084023/tictactoe/gaming-world-bg1_wumcx9.webp)" }}>
                                <div className="intro-item__img">
                                    <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654083912/tictactoe/gaming-world1_isrfmc.webp" alt="intro" />
                                </div>
                                <div className="intro-item__descr">
                                    <h4>LIVE STREAMING</h4>
                                    <p>When unknown printer took type and scrambled it to make type specimen book centuries,</p>
                                </div>
                            </div>
                        </Slide>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 col-xl-4">
                        <Slide bottom>
                            <div className="intro-item" style={{ backgroundImage: "url(https://res.cloudinary.com/tynxcode/image/upload/v1654084023/tictactoe/gaming-world-bg2_zoj5no.webp)" }}>

                                <div className="intro-item__img">
                                    <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654083911/tictactoe/gaming-world2_zmuq0e.webp" alt="intro" />
                                </div>
                                <div className="intro-item__descr">
                                    <h4>GAME NEWS</h4>
                                    <p>When unknown printer took type and scrambled it to make type specimen book centuries,</p>
                                </div>
                            </div>
                        </Slide>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 col-xl-4">
                        <Slide bottom>
                            <div className="intro-item" style={{ backgroundImage: "url(https://res.cloudinary.com/tynxcode/image/upload/v1654084023/tictactoe/gaming-world-bg3_mwuwx7.webp)" }}>
                                <div className="intro-item__img">
                                    <img src="https://res.cloudinary.com/tynxcode/image/upload/v1654083914/tictactoe/gaming-world3_vk1nps.webp" alt="intro" />
                                </div>
                                <div className="intro-item__descr">
                                    <h4>GAME TOURNAMENTS</h4>
                                    <p>When unknown printer took type and scrambled it to make type specimen book centuries,</p>
                                </div>
                            </div>
                        </Slide>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Introduction;