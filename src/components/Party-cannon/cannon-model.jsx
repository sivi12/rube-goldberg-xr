import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useTrimesh } from "@react-three/cannon";

import { arrowHelper } from "./helper-functions";

export function CannonModel({
  onRef,
  position,
  rotation,
  currentItem,
  startGame,
}) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/Models/party_cannon.glb");
  const wheelGeometry = nodes.Object_4.geometry;
  const bodyGeometry = nodes.Object_5.geometry;
  const data1 = nodes.Object_4.geometry.attributes.position.array;
  const data2 = nodes.Object_4.geometry.index.array;
  const data3 = nodes.Object_5.geometry.attributes.position.array;
  const data4 = nodes.Object_5.geometry.index.array;

  const [wheelRef, wheelApi] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      rotation,
      position,
      args: [data1, data2],
    }),
    useRef()
  );

  const [bodyRef, bodyApi] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      rotation,
      position,
      args: [data3, data4],
    }),
    useRef()
  );

  useEffect(() => {
    if (bodyApi.position && wheelApi.position) {
      bodyApi.position.set(...position);
      wheelApi.position.set(...position);
    }
    if (bodyApi.position && wheelApi.rotation) {
      bodyApi.rotation.set(rotation[0], rotation[1], rotation[2] - 3.133);
      wheelApi.rotation.set(rotation[0], rotation[1], rotation[2] - 3.133);
    }
    const direction = [-1, Math.tan(THREE.MathUtils.degToRad(-18)), 0];
    const arrowPosition = [0, -0.055, 0];
    const arrow = arrowHelper(direction, arrowPosition);
    bodyRef.current.add(arrow);

    const timer = setTimeout(() => {
      bodyRef.current.remove(arrow);
    }, 100);
  }, [position, rotation]);

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <group ref={ref} dispose={null}>
      <mesh
        geometry={wheelGeometry}
        material={materials.Cannon_Wheels}
        ref={wheelRef}
      />
      <mesh
        geometry={bodyGeometry}
        material={materials.Cannon_Body}
        ref={bodyRef}
      />
    </group>
  );
}

useGLTF.preload("/Models/party_cannon.glb");
