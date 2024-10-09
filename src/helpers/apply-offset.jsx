import * as THREE from "three";

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
