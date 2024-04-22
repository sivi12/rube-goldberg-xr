import React from "react";
import { useBox } from "@react-three/cannon";
import { MathUtils } from "three/src/math/MathUtils.js";

function Ramp({
  position = [1, 1, 0],
  size = [0.8, 0.01, 0.5],
  rotation = [0, 0, 120],
}) {
  // Umrechnung von 45 Grad in Radianten für Three.js
  const [ref] = useBox(() => ({
    mass: 0, // Mass 0 macht es zu einem statischen Objekt
    position,
    args: size,
    rotation: rotation, // Rotation um die X-Achse und Z-Achse
  }));

  return (
    <mesh ref={ref} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default Ramp;
