import { useBox } from "@react-three/cannon";
import { useEffect, useState } from "react";

function DominoModel({ position, mass, type, rotation, color }) {
  const [ref, api] = useBox(() => ({
    mass: mass,
    position,
    type: type,
    rotation: rotation,
    args: [0.02, 0.2, 0.1],
    //   onCollide: (e) => (e.contact.impactVelocity > 0.0001 ? api.sleep() : null),
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function GameDominos({ newCubes }) {
  console.log("ukjsvdncalkfjsdnldmfknsdllöadsvnjdlkm");
  useEffect(() => {
    console.log(newCubes); // Dies wird jedes Mal ausgeführt, wenn newCubes sich ändert
  }, [newCubes]);
  //   const [newCubes, setNewCubes] = useState([]);

  //   useEffect(() => {
  //     cubes.map((cube) => {
  //       const x = cube.api.current.matrixWorld.elements[12];
  //       const y = cube.api.current.matrixWorld.elements[13];
  //       const z = cube.api.current.matrixWorld.elements[14];

  //       const newPosition = [x, y, z];
  //       const mass = cube.mass;
  //       const color = cube.color;
  //       const rotation = cube.rotation;

  //       console.log(cube.api);
  //       //   newCubes.push({ newPosition, rotation, mass, color });
  //       //   console.log(newCubes);

  //       setNewCubes((prevCubes) => [
  //         ...prevCubes,
  //         { newPosition, rotation, mass, color },
  //       ]);
  //     });
  //   }, [cubes.length]);

  return (
    <>
      {newCubes.map((cube, index) => (
        <>
          <>{console.log(newCubes)}</>
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
