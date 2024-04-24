import React, { useState, useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { useXR, useXREvent, useController } from "@react-three/xr";
import getRandomColor from "../RandomColor";

function DominoModel({ position, color, id, updateDominoPosition }) {
  const [ref, api] = useBox(() => ({
    mass: 10,
    position,
    args: [0.1, 0.1, 0.1],
  }));
  const { scene } = useThree();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const leftController = useController("left");

  useXREvent(
    "selectstart",
    (e) => {
      if (
        leftController &&
        leftController.controller &&
        e.controller &&
        e.controller.controller === leftController.controller
      ) {
        setIsGrabbed(true);
        scene.attach(ref.current);
      }
    },
    { handedness: "left" }
  );

  useXREvent(
    "selectend",
    (e) => {
      if (
        leftController &&
        leftController.controller &&
        e.controller &&
        e.controller.controller &&
        isGrabbed
      ) {
        setIsGrabbed(false);
        scene.attach(ref.current.parent);
        updateDominoPosition(id, ref.current.position.toArray());
      }
    },
    { handedness: "left" }
  );

  useFrame(() => {
    if (isGrabbed && leftController && leftController.controller) {
      ref.current.position.copy(leftController.controller.position);
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function DominoSpawner({ cubes, setCubes }) {
  const updateDominoPosition = (id, newPosition) => {
    setCubes((cubes) =>
      cubes.map((cube) =>
        cube.id === id ? { ...cube, position: newPosition } : cube
      )
    );
  };

  const rightController = useController("right");

  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller) {
        const position = rightController.controller.position.toArray();
        const color = getRandomColor();
        let mass = 100;
        const id = Math.random().toString(36).substring(7); // Unique ID for each cube
        setCubes((prevCubes) => [...prevCubes, { id, position, color, mass }]);
      }
    },
    { handedness: "right" }
  );

  return (
    <>
      {cubes.map((cube) => (
        <DominoModel
          key={cube.id}
          id={cube.id}
          position={cube.position}
          color={cube.color}
          updateDominoPosition={updateDominoPosition}
        />
      ))}
    </>
  );
}

function GrabCubeTest() {
  const [cubes, setCubes] = useState([]);

  return (
    <>
      <DominoSpawner cubes={cubes} setCubes={setCubes} />
    </>
  );
}

export default GrabCubeTest;
