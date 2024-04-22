import React, { useEffect, useState } from "react";
import { useXREvent, useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import getRandomColor from "../RandomColor";

function DominoModel({ position, color }) {
  const [ref, api] = useBox(() => ({
    mass: 10,
    position,
    args: [1, 1, 1],
  }));

  // Funktion erstellen um collisonen zu handeln
  // function handleCollide(e){
  // if(collisonWithGround)
  // if(collisonWithBall)
  // if(collisonWithDomino)
  // }
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function DominoSpawner({ cubes, setCubes }) {
  const rightController = useController("right");

  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller) {
        const position = rightController.controller.position.toArray();
        const color = getRandomColor();
        let mass = 100;
        setCubes((prevCubes) => [...prevCubes, { position, color, mass }]);
      }
    },
    { handedness: "right" }
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

function DominoCloner(e) {
  let mass = 1;
  console.log("heyyy");

  return <DominoModel position={[1.5, 1, 0]} color={"red"} />;
}

function CubeTest() {
  const [cubes, setCubes] = useState([]);

  return (
    <>
      <DominoSpawner cubes={cubes} setCubes={setCubes} />
    </>
  );
}

export default CubeTest;
