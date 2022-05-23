import { FunctionComponent } from "react";
import './user.css'
import { useAuth } from "../../contexts/auth";

interface UserProps {
    
}
 
const UserComponent: FunctionComponent<UserProps> = () => {
    const { user } = useAuth()

    return (  
        <section className="user-component">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="avatar">
                            <img src="/avater2.png" alt="#"/>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="description">
                            <h2 className="description_title"><i className='far fa-star'></i> Information <i className='far fa-star'></i></h2>
                            <div className="user_fullname"><p>Full name: {user?.fullname}</p></div>
                            <div className="user_email"><p>Email: {user?.email}</p></div>
                            <div className="user_ttp"><p>TTP: {user?.TTP}</p></div>
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