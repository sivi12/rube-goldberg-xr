import React, { useEffect, useState, useRef } from "react";
import { useXREvent, useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import getRandomColor from "../RandomColor";
import { useFrame } from "@react-three/fiber";

function DominoModel({ position, color, mass, type, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: mass,
    type: type,
    position,
    args: [0.05, 0.3, 0.14],
  }));
  // Store reference to the mesh for use in raycasting
  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  let _mass = mass;
  useEffect(() => {
    api.mass.set(mass);
    if (type == "Static") {
      api.sleep();
      api.position.set(...position);
    }
  }, [_mass]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
  }, [position, api.position]);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.3, 0.1]} />
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
        const mass = 1;
        const type = "Dynamic";
        setCubes((prevCubes) => [
          ...prevCubes,
          { position, color, mass, type },
        ]);
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
          mass={cube.mass}
          type={cube.type}
          color={cube.color}
          onRef={(ref) => (cube.api = ref)}
        />
      ))}
    </>
  );
}

function CubeSelector({ cubes, setCubes }) {
  const leftController = useController("left");
  const [selectedCube, setSelectedCube] = useState(null);

  useXREvent(
    "squeezestart",
    () => {
      if (leftController && leftController.controller) {
        const tempMatrix = new THREE.Matrix4().extractRotation(
          leftController.controller.matrixWorld
        );
        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.setFromMatrixPosition(
          leftController.controller.matrixWorld
        );
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
        const intersects = raycaster.intersectObjects(
          cubes.map((cube) => cube.api.current),
          true
        );
        if (intersects.length > 0) {
          const firstIntersectedObject = intersects[0].object;
          // Get the controller's current position

          const cubeIndex = cubes.findIndex(
            (cube) => cube.api.current === firstIntersectedObject
          );
          setSelectedCube(cubeIndex);
          //index returnen lassen und neue funktion schreiben welche index entgegennimmt
        }
      }
    },
    { handedness: "left" }
  );

  useXREvent(
    "squeezeend",
    () => {
      setSelectedCube(null);
    },
    { handedness: "left" }
  );

  useFrame(() => {
    if (selectedCube !== null && leftController && leftController.controller) {
      const newPosition = leftController.controller.position.toArray();
      setCubes(
        cubes.map((cube, index) => {
          if (index === selectedCube) {
            return {
              ...cube,
              position: newPosition,
              mass: 0,
              type: "Static",
            };
          }
          return cube;
        })
      );
    }
  });

  return null;
}

function GrabCube() {
  const [cubes, setCubes] = useState([]);

  return (
    <>
      <DominoSpawner cubes={cubes} setCubes={setCubes} />
      <CubeSelector cubes={cubes} setCubes={setCubes} />
    </>
  );
}

export default GrabCube;
