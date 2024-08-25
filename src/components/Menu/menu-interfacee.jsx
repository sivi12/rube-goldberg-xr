import React from "react";
import MenuItem from "./menu-item";
import { AnimatedCube, BallMiniModel, MiniPipe } from "./animated-mini-models";

export default function MenuInterfacee(refObjects) {
  const xPos = 0;
  const yPos = 1.1;
  const zPos = -1.5;
  return (
    <group>
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos - 0.23, yPos + 0.23, -1.5]}
        color={"#3366FF"}
        label={"Ball"}
        AnimatedMiniModel={BallMiniModel}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos + 0, yPos + 0.23, -1.5]}
        color={"#A3FF33"}
        label={"Domino"}
        AnimatedMiniModel={AnimatedCube}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos + 0.23, yPos + 0.23, -1.5]}
        color={"#9B33FF"}
        label={"Domino"}
        AnimatedMiniModel={MiniPipe}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos - 0.23, yPos - 0.23, -1.5]}
        color={"#FF5733"}
        label={"Ball"}
        AnimatedMiniModel={BallMiniModel}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos + 0, yPos - 0.23, -1.5]}
        color={"#3375FF"}
        label={"Domino"}
        AnimatedMiniModel={AnimatedCube}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos + 0.23, yPos - 0.23, -1.5]}
        color={"#FFD433"}
        label={"Domino"}
        AnimatedMiniModel={MiniPipe}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos - 0.23, yPos, -1.5]}
        color={"#33FFF5 "}
        label={"Ball"}
        AnimatedMiniModel={BallMiniModel}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos + 0, yPos, -1.5]}
        color={"#FF33C4"}
        label={"Domino"}
        AnimatedMiniModel={AnimatedCube}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos + 0.23, yPos, -1.5]}
        color={"#FF8633"}
        label={"Domino"}
        AnimatedMiniModel={MiniPipe}
      />

      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos - 0.19, yPos - 0.46, -1.5]}
        color={"green"}
        label={"Start Game"}
        size={[0.33, 0.2, 0.2]}
        fontSize={0.05}
        textPosition={[0, 0, 0]}
      />
      <MenuItem
        ref={refObjects.ballRef}
        position={[xPos + 0.19, yPos - 0.46, -1.5]}
        color={"red"}
        label={"Build Mode"}
        size={[0.33, 0.2, 0.2]}
        fontSize={0.05}
        textPosition={[0, 0, 0]}
      />
    </group>
  );
}
