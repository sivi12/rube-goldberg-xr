import React, { useEffect, useRef, useState } from "react";
import { useTrimesh } from "@react-three/cannon";
import { ItemSelector } from "../../helpers/item-selcetor";
import { ItemSpawner } from "../../helpers/item-spwaner";
import RemoveLastItem from "../../helpers/delete-last-item";
import { useGLTF } from "@react-three/drei";

export function PipeModel({ position, rotation, color, onRef, materials }) {
  const { nodes } = useGLTF("/Models/pipe.glb");
  const geometry =
    nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry;
  const data1 =
    nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry
      .attributes.position.array;
  const data2 =
    nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry
      .index.array;

  const [ref, api] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      position: position,
      rotation: rotation,
      material: {
        friction: 0.001, // Weniger Reibung
        restitution: 0.01, // Mehr Sprungkraft
      },
      args: [data1, data2],
    }),
    useRef()
  );
  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
    if (api.rotation) {
      api.rotation.set(...rotation);
    }
  }, [api.position, api.rotation, position, rotation]);

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <group ref={ref} position={position} dispose={null}>
      <mesh
        castShadow
        geometry={geometry}
        // material={materials.M_TrackModularHalfPipe_LOW}
      >
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
