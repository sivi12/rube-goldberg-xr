import React, { useEffect, useRef, useState } from "react";
import { useXREvent, useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import getRandomColor from "./RandomColor";

function DominoModel({ position, color, cubes, setCubes }) {
  const firstCollide = useRef(true);
  const [ref, api] = useBox(() => ({
    mass: 30,
    position,
    //onCollide: (e) => handleCollide(e),
    args: [0.02, 0.3, 0.1],
  }));

  // function handleCollide(e) {
  //   if (e.contact.impactVelocity > 0.0001) {
  //   }

  //   console.log("oben " + firstCollide.current);
  //   if (ref.current && firstCollide.current) {
  //     console.log(ref.current.position);
  //     let posi = ref.current.position;
  //     //die postion jetzt in neues array geben
  //     firstCollide.current = false;
  //     console.log(firstCollide);
  //   }
  // }

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.3, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function DominoSpawner({ cubes, setCubes }) {
  const leftController = useController("left");

  useXREvent(
    "selectstart",
    () => {
      if (leftController && leftController.controller) {
        const position = leftController.controller.position.toArray();
        const color = getRandomColor();
        let mass = 30;
        setCubes((prevCubes) => [...prevCubes, { position, color, mass }]);
      }
    },
    { handedness: "left" }
  );

  return (
    <>
      {cubes.map((cube, index) => (
        <DominoModel
          key={index}
          position={cube.position}
          color={cube.color}
          cubes={cubes}
          setCubes={setCubes}
        />
      ))}
    </>
  );
}

function Domino() {
  const [cubes, setCubes] = useState([]);
  const [newCubes, setNewCubes] = useState([]);

  return (
    <>
      <DominoModel cubes={cubes} setCubes={setCubes} />
      <DominoSpawner cubes={newCubes} setCubes={setNewCubes} />
    </>
  );
}

export default Domino;
