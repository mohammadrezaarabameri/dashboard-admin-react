import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './App.css'

function App() {
  let router = useRoutes(routes);
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        {router}
      </div>
    </div>
  );
}

export default App;
