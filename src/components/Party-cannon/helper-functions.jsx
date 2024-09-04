import * as THREE from "three";
import { ArrowHelper } from "three";

export function arrowHelper(arrowDirection, arrowPosition) {
  const dir = new THREE.Vector3(
    arrowDirection[0],
    arrowDirection[1],
    arrowDirection[2]
  ).normalize();

  const arrowHelper = new ArrowHelper(
    dir,
    new THREE.Vector3(arrowPosition[0], arrowPosition[1], arrowPosition[2]),
    1,
    0xffff00
  );

  return arrowHelper;
}
export function applyOffset(position, rotation, x, y, z) {
  const ballOffset = new THREE.Vector3(x, y, z);
  ballOffset.applyEuler(new THREE.Euler(...rotation));

  const newPosition = [
    position[0] + ballOffset.x,
    position[1] + ballOffset.y,
    position[2] + ballOffset.z,
  ];

  return newPosition;
}

export function shoot(rotation, api, startGame) {
  const direction = new THREE.Vector3(
    1,
    Math.tan(THREE.MathUtils.degToRad(20)),
    0
  );
  direction.applyEuler(new THREE.Euler(...rotation));
  direction.normalize();
  if (startGame) {
    api.wakeUp();
    api.velocity.set(direction.x * 5, direction.y * 5, direction.z * 5);
  }
}
