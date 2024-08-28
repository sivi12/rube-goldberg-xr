import { useBox } from "@react-three/cannon";
import { useEffect, useState } from "react";

export function GameDominoModel({ position, mass, type, rotation, color }) {
  const [ref, api] = useBox(() => ({
    mass: 3,
    position,
    type: type,
    rotation: [0, rotation[1], 0],
    args: [0.02, 0.2, 0.1],

    // linearDamping: 0.1,
    // linearFactor: [1, 1, 0],
    // sleepSpeedLimit: 0.1,
    // angularFactor: [0.5, 0.5, 1.75],
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function GameDominos({ dominos }) {
  return (
    <>
      {dominos.map((domino, index) => (
        <>
          <GameDominoModel
            key={index}
            position={[
              domino.api.current.matrixWorld.elements[12],
              domino.api.current.matrixWorld.elements[13],
              domino.api.current.matrixWorld.elements[14],
            ]}
            rotation={domino.rotation}
            mass={domino.mass}
            color={domino.color}
            onRef={(ref) => (domino.api = ref)}
          />
        </>
      ))}
    </>
  );
}
