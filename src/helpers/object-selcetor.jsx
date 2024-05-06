import { useXREvent } from "@react-three/xr";
import * as THREE from "three";
import { updatePosition } from "./update-object-position";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAButton } from "../components/Test/a-button-pressed";

export function ObjectSelector({ cubes, setCubes, _controller }) {
  const [selectedObject, setSelectedObject] = useState(null);
  const [lastSelectedObject, setLastSelectedObject] = useState(null);

  useXREvent(
    "squeezestart",
    () => {
      if (_controller && _controller.controller) {
        const tempMatrix = new THREE.Matrix4().extractRotation(
          _controller.controller.matrixWorld
        );
        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.setFromMatrixPosition(
          _controller.controller.matrixWorld
        );
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
        const intersects = raycaster.intersectObjects(
          cubes.map((cube) => cube.api.current),
          true
        );
        if (intersects.length > 0) {
          //const firstIntersectedObject = intersects[0].object.parent; <---- für monkey model
          const firstIntersectedObject = intersects[0].object;
          setSelectedObject(
            cubes.findIndex(
              (cube) => cube.api.current === firstIntersectedObject
            )
          );
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

  // useAButton(controller, () => {
  //   console.log(api);
  //   //TODO!!! NUR DER AKTUELLE DOMINO SOLLTE aufgeweckt werden --> am besten in select object
  //   api.wakeUp(ref);
  // });

  useFrame(() => {
    if (selectedObject !== null && _controller && _controller.controller) {
      const newPosition = _controller.controller.position.toArray();
      const newRoation = _controller.controller.rotation.toArray();
      const type = "Static";
      setCubes(
        updatePosition(cubes, selectedObject, type, newPosition, newRoation)
      );
    }
  });

  return null;
}
