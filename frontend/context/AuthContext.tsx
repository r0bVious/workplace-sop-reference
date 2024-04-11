import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
} from "../helpers/api-communicator.ts";

type User = {
  username: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ username: data.username });
        setIsLoggedIn(true);
        if (data.adminPriv) {
          setIsAdmin(true);
        }
      }
    }
    checkStatus();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password);
    if (data) {
      setUser({ username: data.username });
      setIsLoggedIn(true);
      if (data.adminPriv) {
        setIsAdmin(true);
        console.log("Admin setting to true...");
      }
    }
  };

  const signup = async (username: string, password: string) => {};

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
