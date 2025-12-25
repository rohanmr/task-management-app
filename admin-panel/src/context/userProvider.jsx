import { getAllUsers, getUserInfo } from "@/api/userApi";

import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const res = await getUserInfo();
    setUser(res.data.user);
  };

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    setAllUsers(res.data.users);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchUser();
  }, []);

  return (
    <userContext.Provider
      value={{ user, fetchUser, allUsers, fetchAllUsers, loading }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
