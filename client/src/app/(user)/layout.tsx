import { UserContextProvider } from "@/providers/ProviderContext";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      <div>{children}</div>
    </UserContextProvider>
  );
};

export default Layout;
