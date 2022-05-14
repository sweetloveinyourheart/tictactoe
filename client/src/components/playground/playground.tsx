import { FunctionComponent } from "react";
import "./playground.css"

interface PlaygroundProps {

}

const Playground: FunctionComponent<PlaygroundProps> = () => {
    return (
        <section className="playground">
            <div className="container">
                <div className="area">
                    <div className="caro">
                        <div className="caro-row">
                            <div className="caro-col caro-col--x">
                                <i className="fas fa-times"></i>
                            </div>
                            <div className="caro-col caro-col--o">
                                <i className="far fa-circle"></i>
                            </div>
                            <div className="caro-col"></div>
                        </div>
                        <div className="caro-row">
                            <div className="caro-col"></div>
                            <div className="caro-col"></div>
                            <div className="caro-col"></div>
                        </div>
                        <div className="caro-row">
                            <div className="caro-col"></div>
                            <div className="caro-col"></div>
                            <div className="caro-col"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Playground;