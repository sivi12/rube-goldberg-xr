import React from "react";
import MenuItem from "./menu-item";
import { AnimatedCube, BallMiniModel, MiniPipe } from "./animated-mini-models";
import { Shelf } from "./Kallax_shelf";
import { Plant } from "./Shelf-decoration/Plant";
import { Radio } from "./Shelf-decoration/Old_radio";
import { VinylRecord } from "./Shelf-decoration/Vinyl_record";
import { Books } from "./Shelf-decoration/Books";
import { useBox } from "@react-three/cannon";

export default function MenuInterfaceee(refObjects) {
  const xPos = 0;
  const yPos = 1.1;
  const zPos = -1.5;
  const [ref, api] = useBox(() => ({
    position: [0, 1, -1.5],
    rotation: [0, 0, 0],
    args: [0.67, 1.32, 0.47],
  }));
  return (
    <group position={[0, 1, -1.5]}>
      <Shelf />
      <Plant />
      <Radio />
      <VinylRecord />
      <Books />
      <BallMiniModel position={[-0.1, 0.368, 0]} />
    </group>
  );
}
