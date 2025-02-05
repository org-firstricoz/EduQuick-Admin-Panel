import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean | undefined;
  token: string | null;
  setIsLoggedIn: (value: boolean) => void;
}

interface props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const token = localStorage.getItem("token");
  const checkAuth = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (token) {
      checkAuth();
    } else {
      checkAuth();
    }
  }, [token]);

  useEffect(() => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
