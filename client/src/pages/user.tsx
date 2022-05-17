import { FunctionComponent } from "react";
import Header from "../components/header/header";
import UserComponent from "../components/user/user";

interface UserProps { }
 
const User: FunctionComponent<UserProps> = () => {
    
    return (  
        <>
            <Header />
            <UserComponent />
        </>
    );
}
 
export default User;