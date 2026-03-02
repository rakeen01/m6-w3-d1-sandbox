import React, { useRef, useState, useLayoutEffect } from "react";
import { Canvas } from "@react-vertex/core";
import Scene from "./Scene";

function SphereApp() {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 600 });

  useLayoutEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "calc(100vh - 50px)", background: "#000" }}
    >
      <Canvas width={size.width} height={size.height}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default SphereApp;
