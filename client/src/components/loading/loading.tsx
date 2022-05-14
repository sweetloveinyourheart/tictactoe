import { FunctionComponent } from "react";
import "./loading.css"
interface LoadingProps {

}

const Loading: FunctionComponent<LoadingProps> = () => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

export default Loading;