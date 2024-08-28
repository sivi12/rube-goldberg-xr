import { useEffect, useState } from "react";

// Extra Funktion zum setzen der neuen Dominos
// Wird im Menu aufgerufen, da der zugriff auf cube.api nicht möglich nachdem Die Domino Komponente nicht aktiv ist
// cube.api ist wichtig für die aktuelle Position der Cubes und ni
export default function SaveGameObjects({ dominos, setDominos }) {
  //const [newCubes, setDominos] = useState([]);
  useEffect(() => {
    dominos.map((domino) => {
      const x = domino.api.current.matrixWorld.elements[12];
      const y = domino.api.current.matrixWorld.elements[13];
      const z = domino.api.current.matrixWorld.elements[14];
      const newPosition = [x, y, z];

      setDominos((prevCubes) => [
        ...prevCubes,
        {
          newPosition,
          rotation: domino.rotation,
          mass: domino.mass,
          color: domino.color,
        },
      ]);
    });
    console.log(dominos);
  }, [dominos.length]);
}
