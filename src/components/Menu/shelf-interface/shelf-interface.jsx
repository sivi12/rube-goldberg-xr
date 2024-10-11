import React, { useRef } from "react";
import MenuItem from "../menu-item";
import { Shelf } from "./shelf-3D-models/Kallax_shelf";
import { Plant } from "./shelf-3D-models/Plant";
import { Radio } from "./shelf-3D-models/Old_radio";
import { VinylRecord } from "./shelf-3D-models/Vinyl_record";
import { Books } from "./shelf-3D-models/Books";
import { useBox } from "@react-three/cannon";
import {
  DominoMiniModel,
  BallMiniModel,
  CannonMiniModel,
  MiniBook,
  MiniPipe,
  TrampolineMiniModel,
  GolfTeeMiniModel,
} from "../helpers/animated-mini-models";
import { MarkerManMiniModel } from "../mini-marker-man";
import Tooltips from "../helpers/tooltips";
import { useFrame } from "@react-three/fiber";

export default function ShelfInterface({ refObjects, currentItem }) {
  const [ref, api] = useBox(() => ({
    position: [0, 0.67, -1.5],
    rotation: [0, 0, 0],
    args: [0.7, 1.31, 0.4],
  }));

  return (
    <group position={[0, 0.67, -1.5]}>
      <Shelf />
      <Plant />
      <Radio />
      <VinylRecord position={[-0.17, 0.657, 0]} />
      <VinylRecord position={[-0.06, 0.657, 0.08]} />
      <Books />

      {/* Domino */}
      <mesh position={[-0.1571, 0.365, 0.03]} ref={refObjects.dominoRef}>
        <DominoMiniModel
          position={[0.03, -0.035, 0.01]}
          rotation={[Math.PI / 2, Math.PI, 0.3]}
        />
        <DominoMiniModel
          position={[-0.02, -0.035, 0.03]}
          rotation={[Math.PI / 2, Math.PI, -0.5]}
        />
        <DominoMiniModel position={[0, -0.045, 0]} />
      </mesh>

      <mesh position={[0.145, 0.334, 0.07]} ref={refObjects.rampRef}>
        <MiniBook />
      </mesh>

      {/* Ball */}
      <mesh position={[-0.1, 0.055, 0.1]} ref={refObjects.ballRef}>
        <BallMiniModel />
      </mesh>

      <mesh position={[0, 0.61, 0.16]} ref={refObjects.startAnimationRef}>
        <MarkerManMiniModel />
      </mesh>
      {/* Pipe */}
      <mesh position={[0.1571, -0.252, 0.03]} ref={refObjects.pipeRef}>
        <MiniPipe />
      </mesh>

      <CannonMiniModel
        position={[-0.13, -0.575, 0.15]}
        refObjects={refObjects}
      />

      <TrampolineMiniModel
        currentItem={currentItem}
        position={[0.1571, 0.057, 0.03]}
        refObjects={refObjects}
      />

      {/* <group position={[-0.1571, -0.278, 0.03]} refObjects={refObjects}> */}
      <GolfTeeMiniModel
        position={[-0.1571, -0.278, 0.03]}
        refObjects={refObjects}
      />
      <GolfTeeMiniModel
        position={[-0.0571, -0.278, 0.03]}
        rotation={[0, 0.3, 0]}
        refObjects={refObjects}
      />
      <GolfTeeMiniModel
        position={[-0.1971, -0.263, 0.03]}
        rotation={[0.2, -0.7, 0]}
        refObjects={refObjects}
      />
    </group>
  );
}
