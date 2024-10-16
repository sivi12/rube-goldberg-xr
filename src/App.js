import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import React, { useRef, useState } from "react";
import { ARButton, Controllers, XR, useController } from "@react-three/xr";
import { Physics, Debug, usePlane } from "@react-three/cannon";
import Ground from "./components/Ground";

import { Text, useGLTF } from "@react-three/drei";

import MenuButton from "./components/Menu/menu";
import { ScaleGltfs } from "./helpers/scale-gltfs";
function App() {
  const [scaledAlready, setScaledAlready] = useState("true");
  //jkbdcscs
  return (
    <>
      {scaledAlready && <ScaleGltfs setScaledAlready={setScaledAlready} />}
      <ARButton />
      <Canvas>
        <directionalLight position={[0, 0, 2]} intensity={1.9} />
        <ambientLight position={[0, 0, 2]} intensity={1} />
        <XR>
          <Controllers />
          <Physics stepSize={1 / 180} gravity={[0, -9.81, 0]}>
            <Debug>
              <MenuButton />
            </Debug>

            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
