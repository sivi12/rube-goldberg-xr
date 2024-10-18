/*
Author: Hamza.006 (https://sketchfab.com/Hamza.006)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/book-c5be32eebbdd4cfe94ef9ebbb21e09cf
Title: Book
*/

import React, { useEffect, useState, useRef } from "react";
import { useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import { ItemSelector } from "../../helpers/item-selcetor";
import { ItemSpawner } from "../../helpers/item-spwaner";
import RemoveLastItem from "../../helpers/delete-last-item";
import { useGLTF } from "@react-three/drei";

export function RampModel({ position, rotation, color, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: 100,
    position,
    type: "Static",
    rotation: rotation,
    args: [0.025, 0.265, 0.2],
  }));

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
    if (api.rotation) {
      api.rotation.set(0, rotation[1], Math.PI / 2);
    }
  }, [position, api.position, api]);
  const { nodes, materials } = useGLTF(
    "/Models/shelf-decoration/notebook2.glb"
  );
  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={[0.025, 0.265, 0.2]} />
        <meshStandardMaterial color={color} transparent={true} opacity={0} />
      </mesh>
      <group dispose={null} position={position} rotation={[0, rotation[1], 0]}>
        <mesh
          geometry={nodes.pCube1_lambert2_0.geometry}
          material={materials.lambert2}
          rotation={[-Math.PI, 0, 0]}
          scale={[0.1, 0.05, 0.1]}
        />
      </group>
    </>
  );
}

function Ramp({ currentItem }) {
  const [ramps, setRamps] = useState([]);
  return (
    <>
      <ItemSpawner
        items={ramps}
        setItems={setRamps}
        model={"ramp"}
        currentItem={currentItem}
      />
      <ItemSelector items={ramps} setItems={setRamps} />
      {currentItem === "ramp" && (
        <RemoveLastItem items={ramps} setItems={setRamps} />
      )}
    </>
  );
}

export default Ramp;
