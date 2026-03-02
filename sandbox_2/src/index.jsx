import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "@react-vertex/core";
import { useViewportSize } from "@react-vertex/dom-hooks";
import Scene from "./Scene";

function ViewportScene() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  return (
    <Canvas width={viewportWidth} height={viewportHeight}>
      <Scene />
    </Canvas>
  );
}

const appRoot = document.getElementById("root");
ReactDOM.render(<ViewportScene />, appRoot);

/* Small layout reset kept in index.html

  Current inline block:
  
  <style>
    html, body, div {
      margin: 0;
      padding: 0;
      border: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
*/
