import React from "react";

export default function ItemTooltips() {
  return (
    <mesh>
      <cylinderGeometry args={[0.1, 0.1, 0.5, 4]} />
      <meshStandardMaterial />
      <Text>?</Text>
    </mesh>
  );
}
