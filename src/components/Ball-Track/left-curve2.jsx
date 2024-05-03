import React from "react";

import { useCompoundBody } from "@react-three/cannon";

function CurveSegment({ position, rotation }) {
  const [ref, api] = useCompoundBody(() => ({
    mass: 1,
    type: "Static",
    rotation: [0, 0, Math.PI / 3],
    position: [0, 1.5, 0],
    shapes: [
      {
        type: "Box",
        position: [0, 0, 0], // Position relativ zur Gruppe
        args: [0.16, 0.01, 0.06],
      },
      {
        type: "Box",
        position: [0, 0.01, -0.03], // Position relativ zur Gruppe
        args: [0.16, 0.02, 0.005],
      },
      {
        type: "Box",
        position: [0, 0.01, 0.03], // Position relativ zur Gruppe
        args: [0.16, 0.02, 0.005],
      },
    ],
  }));

  return (
    <group ref={ref}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.16, 0.01, 0.06]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[0, 1.01, 0 - 0.03]}>
        <boxGeometry args={[0.16, 0.02, 0.005]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <mesh position={[0, 1.01, 0 + 0.03]}>
        <boxGeometry args={[0.16, 0.02, 0.005]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

export default function Curve() {
  return (
    <>
      <CurveSegment position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 1.2]} />
    </>
  );
}
