import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import React, { useRef, useState } from "react";
import { ARButton, Controllers, XR, useController } from "@react-three/xr";
import { Physics, Debug, usePlane } from "@react-three/cannon";
import Ground from "./components/Ground";

import { useGLTF } from "@react-three/drei";

import MenuButton from "./components/Menu/menu";

function App() {
  const { nodes } = useGLTF("/pipe.glb");
  const _geometry =
    nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry.scale(
      0.005,
      0.005,
      0.005
    );

  const { nodes: partyCannonNodes, materials } = useGLTF("/party_cannon.glb");
  const _geometry2 = partyCannonNodes.Object_4.geometry.scale(0.2, 0.2, 0.2);
  const _geometry3 = partyCannonNodes.Object_5.geometry.scale(0.2, 0.2, 0.2);

  return (
    <>
      <ARButton />
      <Canvas>
        <directionalLight position={[0, 0, 2]} intensity={1.9} />
        <ambientLight position={[0, 0, 2]} intensity={1} />
        <XR>
          <Controllers />
          <Physics broadphase="SAP">
            <Debug>
              <MenuButton />
            </Debug>
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
            {/* <MarkerManModel /> */}
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
