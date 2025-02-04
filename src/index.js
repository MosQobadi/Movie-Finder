import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Rating from "./components/Rating";
import TextExpender from "./components/TextExpender";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Rating maxRating={10} /> */}
    {/* <TextExpender expandButtonText={"show more"}>
      MV5BZmU0 M2Y 1OGU tZjIxNi 00ZjBkLT g1M jgtO WIyNTh iZWIw YjRi XkE yXk Fq
      cGdeQX VyMT QxNzM zNDI IxNi 00ZjBkLT g1M jgtO WIyNTh iZWIw YjRi XkE yXk Fq
      cGdeQX VyMT QxN itfyit s 54d 54d dtr d gvh zM zNDI IxNi 00ZjBkLT g1M jgtO
      vghjhjg iuh iugfxdcfg dx d trdt cGdeQX VyMT QxNzM zNDI
    </TextExpender> */}
  </React.StrictMode>
);
