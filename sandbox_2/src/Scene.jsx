import React, { useState, useEffect } from "react";
import { timer } from "d3-timer";
import { useOrbitCamera, useOrbitControls } from "@react-vertex/orbit-camera";
import { useCanvasSize, useRender, usePointLight } from "@react-vertex/core";
import { useVector3 } from "@react-vertex/math-hooks";
import Spheres from "./Spheres";
import LightOrb from "./LightOrb";

function Scene() {
  const { width, height } = useCanvasSize();

  const orbitCamera = useOrbitCamera(35, width / height, 1, 5000, (cameraInstance) => {
    cameraInstance.setPosition([0, 0, 600]);
  });
  useOrbitControls(orbitCamera);

  const [sceneRotation, setSceneRotation] = useState([0, 0, 0]);
  const [lightCoords, setLightCoords] = useState([0, 0, 0]);
  const lightColor = useVector3(0.2, 0.9, 0.9);

  usePointLight(lightColor, lightCoords);

  const drawFrame = useRender();

  useEffect(() => {
    const animationTimer = timer((elapsed) => {
      const angle = elapsed * 0.0006;
      const y = Math.cos(angle) * 150;
      const z = Math.sin(angle) * 150;

      setLightCoords([0, y, z]);
      setSceneRotation([0, angle, 0]);
      drawFrame();
    });
    return () => animationTimer.stop();
  }, [drawFrame]);

  return (
    <camera view={orbitCamera.view} projection={orbitCamera.projection}>
      <group rotation={sceneRotation}>
        <Spheres layoutRadius={100} sphereCount={50} sphereRadius={10} />
      </group>
      <LightOrb color={lightColor} position={lightCoords} radius={3} />
    </camera>
  );
}

export default Scene;
