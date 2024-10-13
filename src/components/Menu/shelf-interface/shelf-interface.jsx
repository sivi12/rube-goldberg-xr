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
import GameManual from "../helpers/game-manual";
import { useFrame } from "@react-three/fiber";
import SelectedItemArrow from "../helpers/SelectedItemArrow";
import { Spotlight } from "./shelf-3D-models/Spotlight";
import SelectedItemSpolight from "../helpers/item-spotlight";

export default function ShelfInterface({ refObjects, currentItem }) {
  const [ref, api] = useBox(() => ({
    position: [0, 0.67, -1.5],
    rotation: [0, 0, 0],
    args: [0.7, 1.31, 0.4],
  }));

  return (
    <group position={[0, 0.67, -1.5]}>
      <GameManual currentItem={currentItem} position={[0, 1.3, 0]} />
      {/* <SelectedItemArrow
        currentItem={currentItem}
        position={[-0.1, 0.055, 0.1]}
      /> */}
      <SelectedItemSpolight currentItem={currentItem} refObjects={refObjects} />
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
          currentItem={currentItem}
        />
        <DominoMiniModel
          position={[-0.02, -0.035, 0.03]}
          rotation={[Math.PI / 2, Math.PI, -0.5]}
          currentItem={currentItem}
        />
        <DominoMiniModel position={[0, -0.045, 0]} currentItem={currentItem} />
      </mesh>

      <mesh position={[0.155, 0.334, 0.07]} ref={refObjects.rampRef}>
        <MiniBook />
      </mesh>

      {/* Ball */}
      <mesh position={[-0.15, 0.055, 0.1]} ref={refObjects.ballRef}>
        <BallMiniModel />
      </mesh>

      <mesh position={[0, 0.61, 0.16]} ref={refObjects.startAnimationRef}>
        <MarkerManMiniModel />
      </mesh>
      {/* Pipe */}
      <mesh position={[0.1571, -0.252, 0.09]} ref={refObjects.pipeRef}>
        <MiniPipe />
      </mesh>

      <CannonMiniModel
        position={[-0.17, -0.575, 0.14]}
        refObjects={refObjects}
      />

      <TrampolineMiniModel
        currentItem={currentItem}
        position={[0.1571, 0.057, 0.07]}
        refObjects={refObjects}
      />

      {/* <group position={[-0.1571, -0.278, 0.03]} refObjects={refObjects}> */}

      <mesh ref={refObjects.golfTeeRef}>
        <GolfTeeMiniModel position={[-0.1571, -0.258, 0.09]} />
        <GolfTeeMiniModel position={[-0.0871, -0.258, 0.07]} />
        <GolfTeeMiniModel position={[-0.1971, -0.253, 0.03]} />
      </mesh>
    </group>
  );
}
