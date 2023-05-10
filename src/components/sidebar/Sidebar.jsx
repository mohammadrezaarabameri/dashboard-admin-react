import React, { useRef } from "react";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useLogin } from "../../context/LoginContext/LoginContext";
import { useEffect } from "react";
import axios from "axios";
import { apiRoutes } from "../../api/api";
import { useState } from "react";

const UserAccess = (props) => {
  const { role } = props;

  if (role == "Factory") {
    return (
      <NavLink
        to="/products"
        className={(link) =>
          link.isActive ? "sidebarListItem active" : "link"
        }
      >
        <li className="sidebarListItem">
          <StorefrontIcon className="sidebarIcon" />
          Products
        </li>
      </NavLink>
    );
  } else if (role == "Warehouse") {
    return(
    <NavLink
        to="/warehouse"
        className={(link) =>
          link.isActive ? "sidebarListItem active" : "link"
        }
      >
        <li className="sidebarListItem">
          <StorefrontIcon className="sidebarIcon" />
          Warehouse
        </li>
      </NavLink>
    )
  }
};

export default function Sidebar(props) {
  const { login, setLogin } = useLogin();
  const productRef = useRef(null);
  const generateRef = useRef(null);
  const username = localStorage.getItem("username");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(apiRoutes.registeration.userRole, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { data } = res; // let data = res.data
        let userRole1 = data.message.filter(
          (userObj) => userObj.username === username
        )[0].role;
        setUserRole(userRole1)

      });
  }, []);
  return (
    <div className="sidebar" style={{ backgroundColor: "#120e16" }}>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTittle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink
              to="/Home"
              className={(link) =>
                link.isActive ? "sidebarListItem active" : "link"
              }
            >
              <li className="sidebarListItem ">
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </NavLink>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTittle">Quick Menu</h3>
          <ul className="sidebarList">
            {console.log(userRole)}
            {userRole && <UserAccess role={userRole} />}
            <NavLink
              to="/generate"
              className={(link) =>
                link.isActive ? "sidebarListItem active" : "link"
              }
            >
              <li className="sidebarListItem">
                <PersonAddAltIcon className="sidebarIcon" />
                Generate
              </li>
            </NavLink>
            <NavLink
              to="/shop"
              className={(link) =>
                link.isActive ? "sidebarListItem active" : "link"
              }
            >
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Shop
              </li>
            </NavLink>
            <li className="sidebarListItem">
              <AttachMoneyIcon className="sidebarIcon" />
              Transaction{" "}
            </li>
            <li className="sidebarListItem">
              <BarChartIcon className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
