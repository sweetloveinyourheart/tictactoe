import axios from "axios";
import { createContext, FunctionComponent, useContext, useEffect, useMemo, useState } from "react";
import { UserInterface } from "../types/user";

interface AuthContextType {
    user?: UserInterface;
    loading: boolean;
    error?: any;
    accessToken?: string;
    login: (user: { username: string, password: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
)

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider: FunctionComponent<any> = ({ children }) => {
    const [user, setUser] = useState<UserInterface>()
    const [accessToken, setAccessToken] = useState<string | undefined>()
    const [tokenExpire, setTokenExpired] = useState<any>(undefined)
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    async function getToken() {
        try {
            const { data } = await axios.get<{ accessToken: string, error: string | null }>('/api/auth/refreshToken')
            if (!data?.error) {
                setAccessToken(data.accessToken)
            }

            clearTimeout(tokenExpire);
            setTokenExpired(setTimeout(() => getToken(), 55 * 60 * 1000))
        } catch (error) {
            setLoadingInitial(false)
            setUser(undefined)
        }
    }

    async function login(user: { username: string, password: string }) {
        try {
            setLoading(true)

            const { data } = await axios.post<{ accessToken: string, error: string | null }>('/api/auth/login', user)
            if (data?.accessToken) {
                setAccessToken(data.accessToken)
            }

            setLoading(false)
        } catch (error) {
            setError("Login failed !")
        }
    }

    async function logout() {
        await axios.delete('/api/auth/logout')
        setUser(undefined)
    }

    useEffect(() => {
        (async () => {
            try {
                if (!accessToken) {
                    return getToken();
                }
    
                setLoadingInitial(true)
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const { data } = await axios.get<{ data: UserInterface, error: string | null }>('/api/user/profile')
                if (!data?.error) {
                    setUser(data.data)
                    setLoadingInitial(false)
                }
            } catch (error) {
                setUser(undefined)
                setLoadingInitial(false)
            }
        })()
    }, [accessToken])

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            logout,
            accessToken
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial ? children : "Loading ..."}
        </AuthContext.Provider>
    );
}

export default AuthProvider;