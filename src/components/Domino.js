import React, { useState } from "react";
import { useXREvent, useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import getRandomColor from "./RandomColor";
import { color } from "three/examples/jsm/nodes/Nodes.js";

function DominoModel({ position, color }) {
  const [ref] = useBox(() => ({
    mass: 10,
    position,

    onCollide: (e) => console.log(e.contact.contactPoint),
    args: [0.5, 0.3, 0.1], // Cube dimensions
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.5, 0.3, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function StartGame({ cubes, setCubes }) {
  setCubes((prevCubes) => {
    return prevCubes.map((cube) => ({
      ...cube,
      color: "red",
    }));
  });
}

function DominoSpawner() {
  const [cubes, setCubes] = useState([]);
  const rightController = useController("right");

  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller) {
        const position = rightController.controller.position.toArray();
        const color = getRandomColor();
        setCubes((prevCubes) => [...prevCubes, { position, color }]);
      }
    },
    { handedness: "right" }
  );

  return (
    <>
      {cubes.map((cube, index) => (
        <DominoModel key={index} position={cube.position} color={cube.color} />
      ))}
    </>
  );
}

function Domino() {
  const [cubes, setCubes] = useState([]);

  return (
    <>
      <DominoSpawner />
    </>
  );
}

export default Domino;
