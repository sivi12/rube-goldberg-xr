import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useController } from "@react-three/xr";

function DraggableBox() {
  const ref = useRef();
  const controller = useController("right"); // Annahme, dass der rechte Controller verwendet wird

  // Diese Funktion aktualisiert die Position des Würfels anhand der Controller-Position
  useFrame(() => {
    if (controller && ref.current) {
      ref.current.position.copy(controller.controller.position);
      ref.current.rotation.copy(controller.controller.rotation);
    }
  });

  return (
    <Box ref={ref} args={[0.2, 0.2, 0.2]} position={[0, 1, 0]}>
      <meshStandardMaterial attach="material" color="red" />
    </Box>
  );
}

export default DraggableBox;
