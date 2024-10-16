import { RoundedBox, Text } from "@react-three/drei";
import { useRef } from "react";

export function InfoIcon({ position = [0, 0.05, 0], name }) {
  const ref = useRef();
  return (
    <group position={position} scale={0.1} ref={ref} name={name}>
      {/* Weißer Umrandungskreis */}
      <mesh name={name}>
        <circleGeometry args={[0.21, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Schwarzer gefüllter Kreis, leicht kleiner und etwas nach vorne versetzt */}
      <mesh position={[0, 0, 0.01]} name={name}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Vertikaler Strich des "i" */}
      <mesh position={[0, -0.05, 0.02]} name={name}>
        <boxGeometry args={[0.04, 0.12, 0.01]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Punkt des "i" */}
      <mesh position={[0, 0.07, 0.02]} name={name}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}
