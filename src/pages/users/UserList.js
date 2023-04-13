import React from "react";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function UserList() {
  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div>user</div>
      </div>
    </div>
  );
}
