/*
Author: artumuisrose (https://sketchfab.com/artumuisrose)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/domino-12990eef3cca47d3b5269a18a593f599
Title: Domino
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function DominoGltf(props) {
  const { nodes, materials } = useGLTF("/Models/domino.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          geometry={nodes.Low_Domino_0.geometry}
          material={materials.Domino}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Models/domino.glb");
