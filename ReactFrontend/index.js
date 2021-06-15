import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Convention from "./Convention";
import Talk from "./Talk";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Convention />
    ----
    <Talk/>
  </StrictMode>,
  rootElement
);
