import React, { useEffect, useState, useRef } from "react";
import { useXREvent, useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import getRandomColor from "../RandomColor";

function DominoModel({ position, color, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [0.1, 0.1, 0.1],
  }));
  // Store reference to the mesh for use in raycasting
  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
  }, [position, api.position]);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
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

        setCubes((prevCubes) => [...prevCubes, { position, color, api: null }]);
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
          onRef={(ref) => (cube.api = ref)}
        />
      ))}
    </>
  );
}

function CubeSelector({ cubes, setCubes }) {
  const leftController = useController("left");
  const rightController = useController("right");

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

          console.log("links " + leftController.controller.position.toArray());
          console.log(
            "rechts " + rightController.controller.position.toArray()
          );
          const cubeIndex = cubes.findIndex(
            (cube) => cube.api.current === firstIntersectedObject
          );

          //index returnen lassen und neue funktion schreiben welche index entgegennimmt
          let index = cubeIndex;

          setCubes(
            cubes.map((cube, i) => {
              if (i === index) {
                return {
                  ...cube,
                  position: leftController.controller.position.toArray(),
                };
              }
              return cube;
            })
          );

          cubes.map((cube) => console.log(cube));
        }
      }
    },
    { handedness: "left" }
  );

  return null;
}

function cubeGrabber() {}

function CubeTest() {
  const [cubes, setCubes] = useState([]);

  return (
    <>
      <DominoSpawner cubes={cubes} setCubes={setCubes} />
      <CubeSelector cubes={cubes} setCubes={setCubes} />
    </>
  );
}

export default CubeTest;
