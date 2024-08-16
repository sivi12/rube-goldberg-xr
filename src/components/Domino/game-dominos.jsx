import { useBox } from "@react-three/cannon";
import { useEffect, useState } from "react";

function DominoModel({ position, mass, type, rotation, color }) {
  const [ref, api] = useBox(() => ({
    mass: 150,
    position,
    type: type,
    rotation: [0, rotation[1], 0],
    args: [0.024, 0.24, 0.12],
    // ccdSpeedThreshold: 0.1, // Geschwindigkeitsschwelle für die Aktivierung von CCD
    // ccdSweptSphereRadius: 0.1, // Radius für den CCD-Algorithmus
    // // onCollide: (e) =>
    // //   e.contact.impactVelocity > 0.01 ? api.wakeUp() : api.sleep(),
    // linearDamping: 0.1,
    // linearFactor: [1, 1, 0],
    // angularFactor: [0, 0, 1],
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function GameDominos({ newCubes }) {
  return (
    <>
      {newCubes.map((cube, index) => (
        <>
          <DominoModel
            key={index}
            position={cube.newPosition}
            rotation={cube.rotation}
            mass={cube.mass}
            color={cube.color}
            onRef={(ref) => (cube.api = ref)}
          />
        </>
      ))}
    </>
  );
}
