import { getAllUsers, getUserInfo } from "@/api/userApi";

import { createContext, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const fetchUser = async () => {
    const res = await getUserInfo();
    setUser(res.data.user);
  };

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    setAllUsers(res.data.users);
  };

  return (
    <userContext.Provider value={{ user, fetchUser, allUsers, fetchAllUsers }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
