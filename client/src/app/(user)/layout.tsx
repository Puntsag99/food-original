import React from "react";
import { UserContextProvider } from "../providers/UserProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      <div>{children}</div>
    </UserContextProvider>
  );
};

export default Layout;
