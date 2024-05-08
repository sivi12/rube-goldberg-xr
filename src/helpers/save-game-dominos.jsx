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
// Extra Funktion zum setzen der neuen Dominos
// Wird im Menu aufgerufen, da der zugriff auf cube.api nicht möglich nachdem Die Domino Komponente nicht aktiv ist
// cube.api ist wichtig für die aktuelle Position der Cubes und ni
export default function SaveGameDominos({ cubes, newCubes, setNewCubes }) {
  //const [newCubes, setNewCubes] = useState([]);
  useEffect(() => {
    cubes.map((cube) => {
      const x = cube.api.current.matrixWorld.elements[12];
      const y = cube.api.current.matrixWorld.elements[13];
      const z = cube.api.current.matrixWorld.elements[14];

      const newPosition = [x, y, z];
      const mass = cube.mass;
      const color = cube.color;
      const rotation = cube.rotation;

      setNewCubes((prevCubes) => [
        ...prevCubes,
        { newPosition, rotation, mass, color },
      ]);
      console.log(newCubes);
    });
  }, [cubes.length]);

  // return (
  //   <>
  //     {console.log(newCubes)}
  //     {newCubes.map((cube, index) => (
  //       <>
  //         <DominoModel
  //           key={index}
  //           position={cube.newPosition}
  //           rotation={cube.rotation}
  //           mass={cube.mass}
  //           color={cube.color}
  //           onRef={(ref) => (cube.api = ref)}
  //         />
  //       </>
  //     ))}
  //   </>
  // );
}
