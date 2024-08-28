/*
Author: TYYK (https://sketchfab.com/TYYK)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/golf-tee-d2041884d220442bb5ff484164f94485
Title: Golf Tee
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder, useTrimesh } from "@react-three/cannon";

export function GolfTeeModel({ position, color, onRef }) {
  const { nodes, materials } = useGLTF("/Models/golf_tee.glb");
  const data1 = nodes.Object_2.geometry.attributes.position.array;
  const data2 = nodes.Object_2.geometry.index.array;
  const [ref, api] = useCylinder(
    () => ({
      type: "Static",
      mass: 2,
      position,
      args: [0.035, 0.035, 0.14],
      material: {
        friction: 0.001, // Weniger Reibung
        restitution: 0,
      },
      velocity: [0, 0, 0],
    }),
    useRef()
  );
  // const [] = useTrimesh(() => ({
  //   type: "Static",
  //   mass: 2,
  //   position,
  //   args: [data1, data2],
  //   material: {
  //     friction: 0.001, // Weniger Reibung
  //     restitution: 0,
  //   },
  //   velocity: [0, 0, 0],
  // }));

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
  }, [position, api]);

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <group dispose={null} ref={ref}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/Models/golf_tee.glb");
