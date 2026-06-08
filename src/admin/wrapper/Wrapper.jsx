import React from "react";
import Dashboard from "./Dashboard";
import UserDirectory from "./UserDirectory";
import Recipe from "./Recipe";

const Wrapper = ({ activeNav }) => {
  return (
    <>
      {activeNav === "dashboard" && <Dashboard />}
      {activeNav === "recipes" && <Recipe />}
      {activeNav === "users" && <UserDirectory />}
    </>
  );
};

export default Wrapper;
