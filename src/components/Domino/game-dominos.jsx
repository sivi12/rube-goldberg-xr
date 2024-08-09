import { useBox } from "@react-three/cannon";
import { useEffect, useState } from "react";

function DominoModel({ position, mass, type, rotation, color }) {
  const [ref, api] = useBox(() => ({
    mass: 15,
    position,
    type: type,
    rotation: rotation,
    args: [0.02, 0.2, 0.1],

    // onCollide: (e) =>
    //   e.contact.impactVelocity > 0.01 ? api.wakeUp() : api.sleep(),
    //linearDamping: 0.1,
    linearFactor: [1, 1, 0],
    angularFactor: [0, 0, 1],
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function GameDominos({ newCubes }) {
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
