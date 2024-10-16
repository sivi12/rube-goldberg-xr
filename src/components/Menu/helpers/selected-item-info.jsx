import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { SchoolBoard } from "../3D-Models/Board_school";
import GameManual from "./game-manual";

export default function SelectedItemText({ currentInfo, position }) {
  const RobotoSlab = "/Fonts/RobotoSlab.ttf";
  const EraserDust = "/Fonts/EraserDust.ttf";
  const DrawingGuides = "/Fonts/DrawingGuides.ttf";
  const itemDescription = {
    ballInfo:
      "The ball is a dynamic element,\n \n ready to fall, roll, and collide\n \n with other items once the game is activated",

    dominoInfo:
      "The domino is a classic component,\n \n perfect for starting or continuing a chain reaction.\n \n Place it in a line with other dominos\n \n or near objects to trigger them when tipped over.",

    bookInfo:
      "The book is a static object,\n \n that serves as a stable platform.\n \n Ideal for placing other items\n \n and creating elevation in your chain reaction.",

    cannonInfo:
      "The cannon adds a burst of force to your setup.\n \n Use it to launch a ball, knock over items,\n \n or trigger distant parts of your chain reaction.",

    trampolineInfo:
      "The trampoline is a playful addition\n \n that introduces unpredictable, bouncing motion.\n \n Place it to bounce balls, redirecting them\n \n  and adding a lively twist to your chain reaction.",

    golfTeeInfo:
      "The golf tee offers precise positioning for balls.\n \n Use it to hold a ball in place until nudged,\n \n ensuring controlled starts or delayed releases.",

    pipeInfo:
      "The pipe guides objects along a specific path,\n \n providing a smooth track for balls.",

    arduinoBoxInfo:
      "The Arduino box outline serves as a placement guide,\n \n" +
      "matching the exact size of the physical box. Once the game starts,\n \n" +
      " the outline fades, leaving only an animated character on top.\n \n" +
      " Rolling a real ball into the box triggers a startled reaction from the character,\n \n" +
      " perfect for initiating a chain reaction.\n \n" +
      " To conclude, a ball should collide with the character's head.",

    gameManual:
      "Press the left trigger to select an item\n \n" +
      "Press the right trigger to spawn an item\n \n" +
      "Press and hold the right squeeze \n to change the item position\n \n" +
      "Press Y to delete an item\n \n" +
      "Press A to start the game\n \n" +
      "Press B to go back to build mode\n" +
      " \n",
  };

  const [boardDescription, setBoardDescription] = useState();

  useEffect(() => {
    setBoardDescription(itemDescription[currentInfo]);
  }, [currentInfo]);

  return (
    <group position={(position = [0, 1.5, 0])} rotation={[0, 0, 0]}>
      <mesh>
        {/* <RoundedBox args={[1.8, 0.9, 0.1]} radius={0.08} smoothness={2}>
          <meshStandardMaterial
            color={"green"}
            opacity={0.7}
            transparent={true}
            depthWrite={false}
          />
        </RoundedBox> */}
        <SchoolBoard position={[0, 0, -0.01]} />
      </mesh>
      <Text
        position={[0, 0, 0]} // 1 unit in front of the camera
        fontSize={0.06}
        color="white"
        font={EraserDust}
        anchorX="center" // Horizontale Zentrierung
        anchorY="middle" // Vertikale Zentrierung
        textAlign="center"
      >
        {boardDescription}
      </Text>
    </group>
  );
}
