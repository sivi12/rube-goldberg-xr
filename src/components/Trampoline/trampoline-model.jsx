import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

export function TrampolineModel({ position, rotation, onRef }) {
  const { nodes, materials } = useGLTF("/Models/trampoline.glb");

  const [ref, api] = useCylinder(
    () => ({
      type: "Static",
      mass: 2,
      position: [0.3, 0.2, 0],
      args: [0.15, 0.15, 0.018],
      material: {
        friction: 0.8,
        restitution: 2.7,
      },
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
  }, [position, rotation, api]);

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <>
      <group
        dispose={null}
        scale={0.001}
        position={position}
        rotation={rotation}
        ref={ref}
      >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Object_2.geometry}
            material={materials["black-rubber"]}
          />
          <mesh
            geometry={nodes.Object_3.geometry}
            material={materials["blue-plastic"]}
          />
          <mesh geometry={nodes.Object_4.geometry} material={materials.metal} />
        </group>
      </group>
      <mesh ref={ref}>
        <cylinderGeometry args={[0.17, 0.17, 0.025]} />
        <meshStandardMaterial color="yellow" transparent={true} opacity={0.0} />
      </mesh>
    </>
  );
}
