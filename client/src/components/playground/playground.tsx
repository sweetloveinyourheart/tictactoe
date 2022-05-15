import { FunctionComponent, useCallback, useState } from "react";
import "./playground.css"

interface PlaygroundProps { 
    icon: number
}

const Playground: FunctionComponent<PlaygroundProps> = ({ icon }) => {
    const [caro, setCaro] = useState([
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ])
    const [count, setCount] = useState(0)

    const onCaroClick = useCallback((x: number, y: number) => {
        let items = caro
        items[x][y] = icon
        setCaro(items)
        setCount(s => s + 1)
    }, [caro, count, icon])

    const renderCaroTable = () => {
        return caro.map((el, x) => {
            return (
                <div className="caro-row" key={x}>
                    {el.map((elm, y) => {
                        if (elm < 0)
                            return (
                                <div className="caro-col" key={y} onClick={() => onCaroClick(x, y)}></div>
                            )

                        if (elm === 0)
                            return (
                                <div className="caro-col caro-col--o" key={y}>
                                    <i className="far fa-circle"></i>
                                </div>
                            )

                        return (
                            <div className="caro-col caro-col--x" key={y}>
                                <i className="fas fa-times"></i>
                            </div>
                        )
                    })})
                </div>
            )
        })
    }

    return (
        <section className="playground">
            <div className="container">
                <div className="area">
                    <div className="caro">
                        {renderCaroTable()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Playground;