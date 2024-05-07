import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import React, { useRef, useState } from "react";
import { ARButton, Controllers, XR, useController } from "@react-three/xr";
import { Physics, Debug, usePlane } from "@react-three/cannon";
import Ground from "./components/Ground";
import Ball from "./components/ball";
import Ramp from "./components/Test/Ramp";
import PipeModel from "./components/Test/Pipe";
import { useGLTF } from "@react-three/drei";
import { App2, Monkey2 } from "./components/Test/Cube";
import Domino from "./components/Domino";
import GrabCube from "./components/Test/GrabCube";

import { ObjectSpawner } from "./helpers/pipe-spawner";
import Monkey from "./components/Test/monkey";
import Monkeyy from "./components/Test/monkey";
import MenuButton from "./components/Menu/menu";

function App() {
  // const { nodes, materials } = useGLTF("/sm_track_modular_half_pipe.glb");

  // const pip = [
  //   <PipeModel
  //     _position={[0, 1.7, 0]}
  //     nodes={nodes}
  //     materials={materials}
  //     key={"pipe1"}
  //   />,
  //   <PipeModel
  //     _position={[0.1, 1.3, 0]}
  //     nodes={nodes}
  //     materials={materials}
  //     key={"pipe2"}
  //   />,
  // ];

  const { nodes } = useGLTF("/suzanne.glb");
  const _geometry = nodes.Suzanne_1.geometry.scale(0.5, 0.5, 0.5);

  return (
    <>
      <ARButton />
      <Canvas>
        <directionalLight position={[0, 0, 2]} intensity={1.9} />
        <ambientLight position={[0, 0, 2]} intensity={1} />
        <XR>
          <Controllers />
          <Physics>
            <Debug>
              {/* <Monkeyy nodes={nodes} _geometry={_geometry} /> */}
              {/* <Domino /> */}
            </Debug>
            <MenuButton />
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
            <Ramp />

            {/* <Ball /> */}
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
