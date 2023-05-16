import React, { useEffect, useState } from "react";
import "./shop.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/topbar";
import axios from "axios";
import { apiRoutes } from "../../api/api";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';

export default function Shop() {
  const [shop, setShop] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(apiRoutes.shop.getAssetsInMarket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { data } = res;
        setShop(data.result);
        console.log(shop);
      });
  }, []);

  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div className="list">
          <div className="card">
            <div className="ds-top"></div>
            <div className="avatar-holder">
              <img src="./images/images"/>
            </div>
            <div className="name">
              <a className="username" href="#">username</a>
            </div>
            <div className="ds-info">
              <div className="product">
                <div className="title">
                <h6 className="titleItem">Product</h6>
              </div>
              <p>doodeh</p>
                </div>
              <div className="price">
                <div className="title">
              <h6 className="titleItem">Price</h6>
                </div>
                <p>30</p>
              </div>
              <div className="number">
                <div className="title">
                <h6 className="titleItem" >Number</h6>
                </div>
                <p>25</p>
              </div>
            </div>
            <div className="button">
            <button className="submitCard"><input className="inputCard" type="text" placeholder="place your bid ..."></input>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
