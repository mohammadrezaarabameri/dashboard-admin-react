import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

function App() {
  let router = useRoutes(routes);
  return <div style={{ background: "#120e16"}}>{router}</div>;
}

export default App;
