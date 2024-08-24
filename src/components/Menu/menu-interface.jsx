import React from "react";
import {
  AnimatedCube,
  AnimatedSphere,
  MiniPipe,
  MiniModel,
  ButtonModelAnimated,
} from "./animated-mini-models";
import { Text, useGLTF } from "@react-three/drei";

export default function MenuInterface({ refObjects }) {
  return (
    <group position={[0, 1.5, -1]} rotation={[0, 0, 0]}>
      <mesh name="background" ref={refObjects.menuRef}>
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
        <AnimatedCube size={[0.06, 0.1, 0.015]} />
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
        <AnimatedSphere size={[]} />
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

      <mesh position={[0.13, 0.11, 0.1]} ref={refObjects.rampRef}>
        <AnimatedCube size={[0.06, 0.1, 0.015]} />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Ramp
        </Text>
      </mesh>

      <mesh position={[-0.13, -0.05, 0.1]} ref={refObjects.startAnimationRef}>
        <MiniModel />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Start Animation
        </Text>
      </mesh>

      <mesh position={[0.13, -0.05, 0.1]} ref={refObjects.cannonRef}>
        <ButtonModelAnimated size={[0.06, 0.1, 0.015]} />
        <Text
          position={[0, 0.08, 0.0]}
          fontSize={0.03}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Cannon
        </Text>
      </mesh>

      <mesh
        position={[-0.15, -0.375, 0.0]}
        name="grabPoint"
        ref={refObjects.startButtonRef}
      >
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
      <mesh
        position={[0.15, -0.375, 0.0]}
        name="grabPoint"
        ref={refObjects.buildButtonRef}
      >
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
