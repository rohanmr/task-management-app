import { getUserInfo } from "@/api/userApi";

import { createContext, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const userInfo = await getUserInfo();
    setUser(userInfo.data.user);
  };

  return (
    <userContext.Provider value={{ user, fetchUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
