import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import UserComponent from "../components/user/user";
import { useAuth } from "../contexts/auth";

interface UserProps { }
 
const User: FunctionComponent<UserProps> = () => {
    
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) navigate('/')
    }, [user])

    return (  
        <>
            <Header />
            <UserComponent />
        </>
    );
}
 
export default User;