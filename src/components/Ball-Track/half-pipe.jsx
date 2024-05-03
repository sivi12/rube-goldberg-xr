import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useCompoundBody } from "@react-three/cannon";
import { CylinderGeometry } from "three";
import getRandomColor from "../RandomColor";

export default function Curvy() {
  const [ref] = useCompoundBody(() => ({
    mass: 1, // Gesamte Masse des zusammengesetzten Körpers
    type: "Static", // Der Körper bewegt sich nicht
    shapes: [
      {
        type: "Cylinder",
        position: [0.55, 1.2, 1],
        rotation: [Math.PI / 2, 0, Math.PI / 3],
        args: [0.1, 0.1, 0.7, 32],
      },
      {
        type: "Cylinder",
        position: [0.6, 1.1, 1],
        rotation: [Math.PI / 2, 0, Math.PI / 3],
        args: [0.1, 0.1, 0.7, 32],
      },
      {
        type: "Cylinder",
        position: [0.7, 1, 1],
        rotation: [Math.PI / 2, 0, Math.PI / 3],
        args: [0.1, 0.1, 0.7, 32],
      },
      {
        type: "Cylinder",
        position: [0.8, 1, 1],
        rotation: [Math.PI / 2, 0, Math.PI / 3],
        args: [0.1, 0.1, 0.7, 32],
      },
      {
        type: "Cylinder",
        position: [0.9, 1, 1],
        rotation: [Math.PI / 2, 0, Math.PI / 3],
        args: [0.1, 0.1, 0.7, 32],
      },
      {
        type: "Cylinder",
        position: [1, 1.1, 1],
        rotation: [Math.PI / 2, 0, Math.PI / 3],
        args: [0.1, 0.1, 0.7, 32],
      },
      {
        type: "Cylinder",
        position: [1.05, 1.2, 1],
        rotation: [Math.PI / 2, 0, Math.PI / 3],
        args: [0.1, 0.1, 0.7, 32],
      },
    ],
  }));

  return (
    <mesh ref={ref}>
      {ref.current &&
        ref.current.children.map((child, index) => (
          <mesh
            key={index}
            position={child.position}
            rotation={child.quaternion}
          >
            <cylinderGeometry args={[0.1, 0.1, 0.7, 32]} />
            <meshStandardMaterial color={getRandomColor()} />
          </mesh>
        ))}
    </mesh>
  );
}
