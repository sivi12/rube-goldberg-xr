import { useBox } from "@react-three/cannon";
import { useEffect } from "react";

export default function Wasss({ position, onRef }) {
  const [ref, api] = useBox(() => ({
    position: position,
    args: [0.3, 0.3, 0.3],
    color: "red",
    type: "Static",
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial />
    </mesh>
  );
}
