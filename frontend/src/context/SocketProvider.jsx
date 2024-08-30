import {
    createContext,
    useState,
    useEffect,
    useContext,
    useRef,
  } from "react";
  import io, { Socket } from "socket.io-client";

  const SocketContext = createContext(undefined);
  export const useSocketContext = ()=> {
    const context = useContext(SocketContext);
    if (context === undefined) {
      throw new Error(
        "useSocketContext must be used within a SocketContextProvider"
      );
    }
    return context;
  };
  const socketURL = `http://localhost:5000`
  const SocketContextProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const authUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    // const authUser = useSelector(selectCurrentAuthUser);
    useEffect(() => {
      if (authUserId) {
        const socket = io("http://localhost:5000", {
            transports: ["websocket"],
            query: {
              userId: authUserId,
              token,
            },
          });
        socketRef.current = socket;
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });
        return () => {
          socket.close();
          socketRef.current = null;
        };
      } else if (!authUserId) {
        if (socketRef.current) {
          socketRef.current.close();
          socketRef.current = null;
        }
      }
    }, [authUserId]);
    return (
      <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
        {children}
      </SocketContext.Provider>
    );
  };

export default SocketContextProvider;