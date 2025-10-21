"use client";

import { createContext, PropsWithChildren, useState, useContext } from "react";

type User = {
  email: string;
};

type UserContextType = {
  userEmail: User;
  setUserEmail: React.Dispatch<React.SetStateAction<User>>;
  sendEmail: string;
  setSendEmail: React.Dispatch<React.SetStateAction<string>>;
  loginUserEmail: User;
  setLoginUserEmail: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userEmail, setUserEmail] = useState<User>({ email: "" });
  const [sendEmail, setSendEmail] = useState<string>("");
  const [loginUserEmail, setLoginUserEmail] = useState<User>({ email: "" });

  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        sendEmail,
        setSendEmail,
        loginUserEmail,
        setLoginUserEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserEmailContext = () => useContext(UserContext);
