import React from "react";

import { Text, useGLTF } from "@react-three/drei";
import {
  DominoMiniModel,
  BallMiniModel,
  CannonMiniModel,
  MiniBook,
  MiniPipe,
  ButtonModelAnimated,
} from "./helpers/animated-mini-models";

export default function MenuInterface({ refObjects }) {
  return (
    <group position={[0, 1.5, -1]} rotation={[0, 0, 0]}>
      <mesh name="background">
        <boxGeometry args={[0.6, 0.9, 0.02]} />
        <meshStandardMaterial color="royalblue" />
        <Text
          position={[0, 0.4, 0.05]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Menu
        </Text>
      </mesh>

      <mesh position={[-0.13, 0.27, 0.1]} ref={refObjects.dominoRef}>
        <DominoMiniModel size={[0.06, 0.1, 0.015]} />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Domino
        </Text>
      </mesh>

      <mesh position={[0.13, 0.27, 0.1]} ref={refObjects.ballRef}>
        <BallMiniModel size={[]} />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Ball
        </Text>
      </mesh>

      <mesh position={[-0.13, 0.11, 0.1]} ref={refObjects.pipeRef}>
        <MiniPipe />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Pipe
        </Text>
      </mesh>

      {/* <mesh position={[0.13, 0.11, 0.1]} ref={refObjects.rampRef}>
        <MiniBook />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Ramp
        </Text>
      </mesh> */}

      {/* <mesh position={[-0.13, -0.05, 0.1]} ref={refObjects.startAnimationRef}>
        <MarkerManMiniModel />

        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Start Animation
        </Text>
      </mesh> */}

      {/* <mesh position={[0.13, -0.05, 0.1]} ref={refObjects.cannonRef}>
        <CannonMiniModel size={[0.06, 0.1, 0.015]} />
        <ButtonModelAnimated />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Cannon
        </Text>
      </mesh> */}

      <mesh position={[-0.15, -0.375, 0.0]} ref={refObjects.startButtonRef}>
        <boxGeometry args={[0.3, 0.15, 0.025]} />
        <meshStandardMaterial color="green" />
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Start Game
        </Text>
      </mesh>
      <mesh position={[0.15, -0.375, 0.0]} ref={refObjects.buildButtonRef}>
        <boxGeometry args={[0.3, 0.15, 0.025]} />
        <meshStandardMaterial color="red" />
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Build Mode
        </Text>
      </mesh>
    </group>
  );
}
