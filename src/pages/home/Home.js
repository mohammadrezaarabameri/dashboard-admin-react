import React from "react";
import Feature from "../../components/features/Feature";
import { xAxisData } from "../../data";
import Chart from "./../../components/chart/Chart";
import Topbar from "./../../components/topbar/topbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="row">
        <Sidebar />
      <div className="home">
        <Feature />
        <Chart grid tittle="year sale" data={xAxisData} datakey="sale" />
      </div>
      </div>
    </>
  );
}
