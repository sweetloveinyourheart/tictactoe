import { createContext, FunctionComponent, useContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { useAuth } from "./auth";

interface SocketContextType {
    socket: Socket | undefined
}

const SocketContext = createContext<SocketContextType>(
    {} as SocketContextType
)

interface SocketProviderProps {
    children: any
}

const socketEndpoint = process.env.SOCKET_URL

export function useSocket() { return useContext(SocketContext) }

const SocketProvider: FunctionComponent<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket>()

    const { user, accessToken } = useAuth()

    useEffect(() => {
        if (user) {
            setSocket(io(socketEndpoint || "https://tictacground.space", { query: { token: accessToken } }))
        }
    }, [user, accessToken])

    const memoedValue = useMemo(
        () => ({
            socket
        }),
        [socket]
    );

    return (
        <SocketContext.Provider value={memoedValue}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;