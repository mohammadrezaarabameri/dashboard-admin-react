import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {

  let router = useRoutes(routes)
  return (
    <div>
      {router}
    </div>
  );
}

export default App;
