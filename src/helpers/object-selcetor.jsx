import { useController, useXREvent } from "@react-three/xr";
import * as THREE from "three";
import { updatePosition, updateType } from "./update-object-position";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export function ObjectSelector({ cubes, setCubes, isGLTF }) {
  const rightController = useController("right");
  const [selectedObject, setSelectedObject] = useState(null);
  const [itemType, setItemType] = useState(null);

  useXREvent(
    "squeezestart",
    () => {
      if (rightController && rightController.controller) {
        const tempMatrix = new THREE.Matrix4().extractRotation(
          rightController.controller.matrixWorld
        );
        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.setFromMatrixPosition(
          rightController.controller.matrixWorld
        );
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
        const intersects = raycaster.intersectObjects(
          cubes.map((cube) => cube.api.current),
          true
        );
        let firstIntersectedObject;
        if (intersects.length > 0) {
          if (isGLTF) {
            firstIntersectedObject = intersects[0].object.parent;
          } else {
            firstIntersectedObject = intersects[0].object;
          }

          const index = cubes.findIndex(
            (cube) => cube.api.current === firstIntersectedObject
          );
          setSelectedObject(index);
          setItemType("Static");
        }
      }
    },
    { handedness: "right" }
  );

  useXREvent(
    "squeezeend",
    () => {
      setSelectedObject(null);
      setItemType("Dynamic");
      setTimeout(() => {
        setItemType("Static"); // wird erst nach 0.2 sekunden gesetzt damit
      }, 1000);
    },
    { handedness: "right" }
  );

  useFrame(() => {
    if (
      selectedObject !== null &&
      rightController &&
      rightController.controller
    ) {
      const newPosition = rightController.controller.position.toArray();
      const newRoation = rightController.controller.rotation.toArray();

      setCubes(
        updatePosition(cubes, selectedObject, itemType, newPosition, newRoation)
      );
    }
    if (
      itemType === "Dynamic" &&
      rightController &&
      rightController.controller
    ) {
      console.log("hier gehts ab");
      const newPosition = rightController.controller.position.toArray();
      const newRoation = rightController.controller.rotation.toArray();
      const type = "Dynamic";
      setCubes(
        updatePosition(cubes, selectedObject, type, newPosition, newRoation)
      );
    }
  });

  return null;
}
