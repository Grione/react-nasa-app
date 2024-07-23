import { createContext, useState, useContext } from "react";

type ContextValueTypes = {
  isUserAuth: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

const UserCtx = createContext<ContextValueTypes | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {

  const [isUserAuth, setIsUserAuth] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  function loginUser() {
    setIsUserAuth(true);
  }

  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    setIsUserAuth(false);
  }

  const ctxValue = {
    isUserAuth,
    loginUser,
    logoutUser
  }

  return <UserCtx.Provider value={ctxValue}>{children}</UserCtx.Provider>
}

export const useUser = (): ContextValueTypes => {
  const context = useContext(UserCtx);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};