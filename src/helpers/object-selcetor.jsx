import { useController, useXREvent } from "@react-three/xr";
import * as THREE from "three";
import { updatePosition } from "./update-object-position";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export function ObjectSelector({ cubes, setCubes, isGLTF }) {
  const rightController = useController("right");
  const [selectedObject, setSelectedObject] = useState(null);
  const [lastSelectedObject, setLastSelectedObject] = useState(null);

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
          setLastSelectedObject(index);
        }
      }
    },
    { handedness: "right" }
  );

  useXREvent(
    "squeezeend",
    () => {
      setSelectedObject(null);
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
      const type = "Static";
      setCubes(
        updatePosition(cubes, selectedObject, type, newPosition, newRoation)
      );
    }
  });

  return null;
}
