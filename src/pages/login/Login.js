import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { apiRoutes } from "../../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const changeUser = (e) => {
    setUserName(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitBtn = (e) => {
    e.preventDefault();

    const data = {
      username: userName,
      password: password,
    };
    sendRegisterReq(data);
  };

  const sendRegisterReq = (reqData) => {
    axios
      .post(apiRoutes.registeration.register, {
        ...reqData,
      })
      .then((res) => {
        console.log(res);
        let { data } = res;
        if (data.token && data.token !== undefined && data.token !== null) {
          localStorage.setItem("token", data.token);
          setRoleAccess(reqData.username);
        }
      });
  };

  const setRoleAccess = (currUser) => {
    const token = localStorage.getItem("token");

    axios
      .get(apiRoutes.registeration.userRole, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { data } = res; // let data = res.data
        let userRole = data.message.filter(
          (userObj) => userObj.username === currUser
        )[0];

        switch (userRole.role) {
          case "Warehouse":
            window.location.replace("Warehouse.js");
            return;
          default:
            navigate("/Home");
            return;
        }
      });
  };
  return (
    <div className="html" style={{backgroundColor: "#120e16"}}>
      <div className="body">
        <div className="containerLogin">
          <div className="tittleLogin">Sig in</div>
          <form onSubmit={submitBtn}>
            <div className="login">
              <span class="fas fa-user"></span>
              <input type="text" onChange={changeUser} placeholder="username"></input>
            </div>
            <div className="login">
              <span class="fas fa-user"></span>
              <input type="number" onChange={changePassword} placeholder="password"></input>
            </div>
            <div className="forget">
              <Link to="">forget password?</Link>
            </div>
            <button type="submit" className="submitLogin">Sig in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
