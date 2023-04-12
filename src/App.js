import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Topbar from "./components/topbar/topbar";

function App() {

  let router = useRoutes(routes)
  return (
    <div>
      <Topbar />
      {router}
    </div>
  );
}

export default App;
