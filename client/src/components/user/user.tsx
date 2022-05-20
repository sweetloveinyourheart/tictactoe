import { FunctionComponent } from "react";
import './user.css'

interface UserProps {
    
}
 
const UserComponent: FunctionComponent<UserProps> = () => {
    return (  
        <section className="user-component">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="avatar">
                            <img src="/avater.png" alt="#"/>
                        </div>
                    </div>
                    <div className="col-xl-8">
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default UserComponent;