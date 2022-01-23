import React from "react";
import { ReactComponent as LoaderSVG } from "../Media/Loader.svg";
import "../Media/ANILITELoader.css";
import { ReactComponent as AniliteLoader } from "../Media/AniliteLoader.svg";

export default function Loader({ display }) {
  return (
    <div
      style={{
        background: "black",
        position: "absolute",
        height: window.innerHeight,
        width: window.innerWidth,
        zIndex: 2,
        display: display ? "block" : "none",
      }}
    >
      <AniliteLoader
        style={{
          height: "50%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          position: "relative",
          background: "black",
        }}
      />
    </div>
  );
}
