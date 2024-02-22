import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //Hook

  // declare usefull auth states

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  //Function
  const login = useCallback((token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("gebeya_quiz", JSON.stringify({ token, user }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("gebeya_quiz");
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("gebeya_quiz");
    if (storedData) {
      const adminData = JSON.parse(storedData);
      if (adminData?.token) {
        login(adminData.token, adminData.user);
        setChecked(true);
      }
    }
    setChecked(true);
  }, [login]);

  //Return
  return (
    <AuthContext.Provider value={{ token, user, checked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
