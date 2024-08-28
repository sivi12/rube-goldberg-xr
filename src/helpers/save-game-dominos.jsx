import { useEffect, useState } from "react";

// Extra Funktion zum setzen der neuen Dominos
// Wird im Menu aufgerufen, da der zugriff auf cube.api nicht möglich nachdem Die Domino Komponente nicht aktiv ist
// cube.api ist wichtig für die aktuelle Position der Cubes und ni
export default function SaveGameObjects({ cubes, setNewCubes }) {
  //const [newCubes, setNewCubes] = useState([]);
  useEffect(() => {
    cubes.map((cube) => {
      const x = cube.api.current.matrixWorld.elements[12];
      const y = cube.api.current.matrixWorld.elements[13];
      const z = cube.api.current.matrixWorld.elements[14];
      const newPosition = [x, y, z];

      setNewCubes((prevCubes) => [
        ...prevCubes,
        {
          newPosition,
          rotation: cube.rotation,
          mass: cube.mass,
          color: cube.color,
        },
      ]);
    });
    console.log(cubes);
  }, [cubes.length]);
}
