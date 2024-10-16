import React, { useRef, useState } from "react";
import { Shelf } from "./shelf-3D-models/Kallax_shelf";
import { Plant } from "./shelf-3D-models/Plant";
import { Radio } from "./shelf-3D-models/Old_radio";
import { VinylRecord } from "./shelf-3D-models/Vinyl_record";
import { Books } from "./shelf-3D-models/Books";
import { useBox } from "@react-three/cannon";

import { MarkerManMiniModel } from "./shelf-3D-models/mini-marker-man";

import SelectedItemSpolight from "../helpers/selected-item-spotlight";
import { InfoIcon } from "../helpers/info-icon";
import { useController, useXREvent } from "@react-three/xr";
import { menuItemSelector } from "../helpers/menu-item-selector";
import SelectedItemText from "../helpers/selected-item-info";
import {
  BallMiniModel,
  CannonMiniModel,
  DominoMiniModel,
  GolfTeeMiniModel,
  MiniBook,
  MiniPipe,
  TrampolineMiniModel,
} from "./shelf-3D-models/animated-mini-models";

export default function ShelfInterface({
  currentItem,
  setCurrentItem,
  setStartGame,
}) {
  const menuRef = useRef();
  const dominoRef = useRef();
  const ballRef = useRef();
  const startButtonRef = useRef();
  const buildButtonRef = useRef();
  const rampRef = useRef();
  const pipeRef = useRef();
  const cannonRef = useRef();
  const startAnimationRef = useRef();
  const trampolineRef = useRef();
  const golfTeeRef = useRef();

  const refObjects = {
    menuRef,
    dominoRef,
    ballRef,
    startButtonRef,
    buildButtonRef,
    rampRef,
    pipeRef,
    cannonRef,
    startAnimationRef,
    trampolineRef,
    golfTeeRef,
  };

  const leftController = useController("left");

  const [ref, api] = useBox(() => ({
    position: [0, 0.65, -1.5],
    rotation: [0, 0, 0],
    args: [0.7, 1.31, 0.4],
  }));

  const [currentInfo, setCurrentInfo] = useState("gameManual");

  useXREvent(
    "selectstart",
    () => {
      if (leftController) {
        menuItemSelector(
          refObjects,
          setCurrentItem,
          setStartGame,
          setCurrentInfo,
          leftController
        );
      }
    },
    { handedness: "left" }
  );

  return (
    <group position={[0, 0.65, -1.5]}>
      {/* <GameManual currentItem={currentItem} position={[0, 1.3, 0]} /> */}
      {/* <SelectedItemArrow
        currentItem={currentItem}
        position={[-0.1, 0.055, 0.1]}
      /> */}
      <SelectedItemSpolight currentItem={currentItem} />
      <SelectedItemText currentInfo={currentInfo} />

      <Shelf />
      <Plant />
      <Radio />
      <VinylRecord position={[-0.17, 0.657, 0]} />
      <VinylRecord position={[-0.06, 0.657, 0.08]} />
      <Books />

      <mesh position={[-0.1571, 0.365, 0.03]} ref={dominoRef}>
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
        <InfoIcon position={[0, 0.07, 0]} name={"dominoInfo"} />
      </mesh>

      <mesh position={[0.155, 0.334, 0.07]} ref={rampRef}>
        <MiniBook />
        <InfoIcon name={"bookInfo"} />
      </mesh>

      {/* Ball */}
      <mesh position={[-0.15, 0.055, 0.1]} ref={ballRef}>
        <BallMiniModel />
        <InfoIcon position={[0, 0.1, 0]} name={"ballInfo"} />
      </mesh>

      <mesh position={[0, 0.61, 0.16]} ref={startAnimationRef}>
        <MarkerManMiniModel />
        <InfoIcon position={[0, 0.19, 0]} name={"arduinoBoxInfo"} />
      </mesh>
      {/* Pipe */}
      <mesh position={[0.1571, -0.252, 0.09]} ref={pipeRef}>
        <MiniPipe />
        <InfoIcon name={"pipeInfo"} />
      </mesh>

      <mesh position={[-0.17, -0.575, 0.14]} ref={cannonRef}>
        <CannonMiniModel />
        <InfoIcon position={[0, 0.13, 0]} name={"cannonInfo"} />
      </mesh>

      <mesh ref={trampolineRef} position={[0.1571, 0.035, 0.07]}>
        <TrampolineMiniModel />
        <InfoIcon position={[0, 0.06, 0]} name={"trampolineInfo"} />
      </mesh>

      <mesh position={[-0.1571, -0.258, 0.09]} ref={golfTeeRef}>
        <GolfTeeMiniModel />
        <GolfTeeMiniModel position={[-0.07, 0, -0.03]} />
        <GolfTeeMiniModel position={[0.04, 0, -0.03]} />
        <InfoIcon position={[0, 0.13, 0]} name={"golfTeeInfo"} />
      </mesh>
    </group>
  );
}
