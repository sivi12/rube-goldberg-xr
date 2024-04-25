import { useXREvent, useController } from "@react-three/xr";
import * as THREE from "three";
import { updatePosition } from "./update-object-position";

export function ObjectSelector({ cubes, setCubes, _controller }) {
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
          const firstIntersectedObject = intersects[0].object;
          const cubeIndex = cubes.findIndex(
            (cube) => cube.api.current === firstIntersectedObject
          );

          // Neue Position setzen
          const newPosition = _controller.controller.position.toArray();
          setCubes(updatePosition(cubes, cubeIndex, newPosition));
        }
      }
    },
    { handedness: "left" }
  );

  return null;
}
