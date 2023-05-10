import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { apiRoutes } from "../../api/api";
import LoginProvider, {
  useLogin,
} from "../../context/LoginContext/LoginContext";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, setLogin } = useLogin();

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
          localStorage.setItem("username", reqData.username)
          setRoleAccess(reqData.username);
          setLogin(reqData.username);
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
          default:
            navigate("/Home");
            return;
        }
      });
  };
  return (
      <div style={{    background: "#fff"}} className="html">
        <div className="body">
          <div className="containerLogin">
            <div className="tittleLogin">Supply Chain</div>
            <form onSubmit={submitBtn}>
              <div className="login">
                <span class="fas fa-user"></span>
                <input
                  type="text"
                  onChange={changeUser}
                  placeholder="username"
                ></input>
              </div>
              <div className="login">
                <span class="fas fa-user"></span>
                <input
                  type="password"
                  onChange={changePassword}
                  placeholder="password"
                ></input>
              </div>
              <div className="forget">
                <Link to="">forget password?</Link>
              </div>
              <button type="submit" className="submitLogin">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
