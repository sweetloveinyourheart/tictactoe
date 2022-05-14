import Player from "../components/player/player";
import Playground from "../components/playground/playground";


export default function PlayGroundPage() {
    return (
        <div style={{
            background: "url(https://htmldemo.net/bonx/bonx/assets/img/bg/body-bg2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll"
        }}>
            <Player />
            <Playground />
        </div>
    )
}