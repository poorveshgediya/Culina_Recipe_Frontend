import React, { useState } from "react";
import CreateUser from "./CreateUser";
import { useCallback } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import Members from "./Members";
import Admins from "./Admins";
import axios from "axios";

const UserDirectory = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("member");

  const handleCreateUserClick = () => {
    setShowCreateForm((prev) => !prev);
  };

  const showUsers = useCallback(() => {
    axios.get(`${import.meta.env.VITE_RECIPE_APP_API}/admin/members`)
      .then((res) => res.data)
      .then((data) => setUsers(data))
      .catch((err) => alert(err.response?.data?.message || "Failed to fetch users. Check if the server is running."));
  }, []);

  useEffect(() => {
    showUsers();
  }, [showUsers]);

  const members = useMemo(
    () => users.filter((user) => user.role === "member"),
    [users],
  );
  const admins = useMemo(
    () => users.filter((user) => user.role === "admin"),
    [users],
  );

  return (
    <>
      {!showCreateForm && (
        <div className="p-8 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="font-headline text-4xl font-bold text-primary tracking-tight mb-2">
                CulinaShare Community
              </h3>
              <p className="text-on-surface-variant/80 font-body">
                Managing the creative minds behind our digital table.
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-secondary to-secondary-container text-white px-8 py-4 rounded-full font-label text-sm font-bold uppercase tracking-widest editorial-shadow flex items-center gap-2 hover:scale-[1.02] transition-transform active:scale-95"
              onClick={handleCreateUserClick}
            >
              <span className="material-symbols-outlined">person_add</span>
              Add New User
            </button>
          </div>

          <div className="flex gap-8 border-b-0 mb-6">
            {/* <button className="font-headline text-lg font-bold text-[#f46a25] border-b-2 border-[#f46a25] pb-2 transition-colors"> */}
            <button
              className={`font-headline text-lg ${activeTab === "member" ? "font-bold text-[#f46a25] border-b-2 border-[#f46a25]" : "font-medium text-on-surface-variant hover:text-secondary "} pb-2 transition-all delay-75`}
              onClick={() => setActiveTab("member")}
            >
              Members{" "}
              <span className={`ml-2 px-2 py-0.5 ${activeTab === "member" ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-surface-container-highest text-on-surface-variant"} text-xs rounded-full`}>
                {members.length}
              </span>
            </button>
            <button
              className={`font-headline text-lg ${activeTab === "admin" ? "font-bold text-[#f46a25] border-b-2 border-[#f46a25]" : "font-medium text-on-surface-variant hover:text-secondary"} pb-2 transition-all delay-75`}
              onClick={() => setActiveTab("admin")}
            >
              Admins{" "}
              <span className={`ml-2 px-2 py-0.5 ${activeTab === "admin" ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-surface-container-highest text-on-surface-variant"} text-xs rounded-full`}>
                {admins.length}
              </span>
            </button>
          </div>

          <div className="bg-surface-container-low rounded-xl overflow-auto editorial-shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50">
                  <th className="px-6 py-5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Full Name
                  </th>
                  <th className="px-6 py-5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Username
                  </th>
                  <th className="px-6 py-5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Role
                  </th>
                  <th className="px-6 py-5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">
                    Join Date
                  </th>
                  <th className="px-6 py-5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {/* <!-- User Row 1 --> */}
                {activeTab === "member" && <Members members={members} refreshUsers={showUsers} />}

                {/* <!-- Admin Example Row (For Visual Context in Member Tab) --> */}
                {activeTab === "admin" && <Admins admins={admins} refreshUsers={showUsers} />}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showCreateForm && (
        <CreateUser handleCreateUserClick={handleCreateUserClick} showUsers={showUsers} />
      )}
    </>
  );
};

export default UserDirectory;
