import { userContext } from "@/context/userProvider";
import React, { useContext } from "react";

const SettingPage = () => {
  const {user} = useContext(userContext);
  return <div className="capitalize">{user.role} Settings</div>;
};

export default SettingPage;
