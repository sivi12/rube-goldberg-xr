import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import React, { useRef, useState } from "react";
import { ARButton, Controllers, XR, useController } from "@react-three/xr";
import { Physics, Debug, usePlane } from "@react-three/cannon";
import Ground from "./components/Ground";

import { useGLTF } from "@react-three/drei";

import MenuButton from "./components/Menu/menu";
import { Dance, DanceModel } from "./Dance";

function App() {
  const { nodes } = useGLTF("/sm_track_modular_half_pipe.glb");
  const _geometry =
    nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry.scale(
      0.005,
      0.005,
      0.005
    );

  return (
    <>
      <ARButton />
      <Canvas>
        <directionalLight position={[0, 0, 2]} intensity={1.9} />
        <ambientLight position={[0, 0, 2]} intensity={1} />
        <XR>
          <Controllers />
          <Physics>
            <Debug></Debug>
            <MenuButton nodes={nodes} _geometry={_geometry} />
            {/* <DanceModel position={[0, 1, 0]} /> */}

            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
