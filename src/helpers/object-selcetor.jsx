import { useController, useXREvent } from "@react-three/xr";
import * as THREE from "three";
import { updatePosition, updateType } from "./update-object-position";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export function ObjectSelector({ cubes, setCubes, isGLTF }) {
  const rightController = useController("right");
  const [selectedObject, setSelectedObject] = useState(null);

  //eine ObjectSelector Methode anstatt es in jedem Objekt neu zu übergeben?
  //

  useXREvent(
    "squeezestart",
    () => {
      console.log("cubes", cubes);
      cubes.map((cube) => console.log(cube.api.current));

      if (rightController && rightController.controller && cubes) {
        const tempMatrix = new THREE.Matrix4().extractRotation(
          rightController.controller.matrixWorld
        );
        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.setFromMatrixPosition(
          rightController.controller.matrixWorld
        );
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
        // cubes.map((cube) => console.log(cube.api.current));
        //schaue durch alle objekte des gerade auswählten items, ob der strahl einen dieser objekte trifft
        const intersects = raycaster.intersectObjects(
          cubes.map((cube) => cube.api.current),
          true
        );
        console.log("intersects", intersects);
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
          console.log(index, " index");
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
      const newPositionX = rightController.controller.position.toArray()[0];
      const newPositionY = rightController.controller.position.toArray()[1];
      const newPositionZ = rightController.controller.position.toArray()[2];
      const newPosition = [newPositionX, newPositionY, newPositionZ];
      const newRoation = rightController.controller.rotation.toArray();

      setCubes(updatePosition(cubes, selectedObject, newPosition, newRoation));
    }
  });

  return null;
}
