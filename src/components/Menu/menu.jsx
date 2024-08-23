import { Text, useGLTF } from "@react-three/drei";
import { useController, useXREvent } from "@react-three/xr";
import { useRef, useState } from "react";

import Domino from "../Domino/Domino";

import {
  AnimatedCube,
  AnimatedSphere,
  MiniPipe,
  MiniModel,
  ButtonModelAnimated,
} from "./animated-mini-models";
import GameDominos from "../Domino/game-dominos";
import { useButton } from "../../helpers/buttons";
import SaveGameObjects from "../../helpers/save-game-dominos";
import Ramp from "../Ramp/ramp";
import Pipe from "../Pipe/Pipe";
import { Ball } from "../Ball/ball";
import { GameBox } from "../physical-game-box/game-box";
import Cannon from "../Party-cannon/party-cannon";

import Trampoline from "../Trampoline/trampoline";
import GolfTee from "../Golf-tee/golf-tee";
import { menuItemSelector } from "./menu-item-selector";

export default function MenuButton({}) {
  const leftController = useController("left");
  const rightController = useController("right");

  const [currentItem, setCurrentItem] = useState(""); //Umbenennen in currentObjekt, da showObjekt nicht passend ist
  const [startGame, setStartGame] = useState(false);
  const [saveCubes, setSaveCubes] = useState(false);
  const [cubes, setCubes] = useState([]);
  const [newCubes, setNewCubes] = useState([]);
  const [arduinoButtonPressed, setArduinoButtonPressed] = useState(false);

  const stateObject = {
    currentItem: { value: currentItem, setter: setCurrentItem },
    startGame: { value: startGame, setter: setStartGame },
    saveCubes: { value: saveCubes, setter: setSaveCubes },
    cubes: { value: cubes, setter: setCubes },
    newCubes: { value: newCubes, setter: setNewCubes },
    arduinoButtonPressed: { value: false, setter: setArduinoButtonPressed },
  };

  const menuRef = useRef();
  const dominoRef = useRef();
  const ballRef = useRef();
  const startButtonRef = useRef();
  const buildButtonRef = useRef();
  const rampRef = useRef();
  const pipeRef = useRef();
  const cannonRef = useRef();
  const startAnimationRef = useRef();

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
  };

  useXREvent(
    "selectstart",
    () => {
      if (leftController) {
        menuItemSelector(
          refObjects,
          setCurrentItem,
          setStartGame,
          setSaveCubes,
          setNewCubes,
          leftController
        );
      }
    },
    { handedness: "left" }
  );

  useButton(rightController, "a", () => {
    setSaveCubes(true);
    setArduinoButtonPressed(true);
    setTimeout(() => {
      setStartGame(true); // wird erst nach 0.2 sekunden gesetzt damit
    }, 200);
  });

  useButton(rightController, "b", () => {
    setStartGame(false);
    setSaveCubes(false);
    setNewCubes([]);
  });

  return (
    <>
      <group position={[0, 1.5, -1]} rotation={[0, 0, 0]}>
        <mesh name="background" ref={menuRef}>
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

        <mesh position={[-0.13, 0.27, 0.1]} ref={dominoRef}>
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

        <mesh position={[0.13, 0.27, 0.1]} ref={ballRef}>
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

        <mesh position={[-0.13, 0.11, 0.1]} ref={pipeRef}>
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

        <mesh position={[0.13, 0.11, 0.1]} ref={rampRef}>
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

        <mesh position={[-0.13, -0.05, 0.1]} ref={startAnimationRef}>
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

        <mesh position={[0.13, -0.05, 0.1]} ref={cannonRef}>
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
          ref={startButtonRef}
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
          ref={buildButtonRef}
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
      <group>
        {/* <ConnectToArduino
          arduinoButtonPressed={arduinoButtonPressed}
          setArduinoButtonPressed={setArduinoButtonPressed}
        /> */}
        {!startGame && (
          <>
            <Domino
              cubes={cubes}
              setCubes={setCubes}
              currentItem={currentItem}
            />{" "}
          </>
        )}

        {saveCubes && (
          <SaveGameObjects
            cubes={cubes}
            newCubes={newCubes}
            setNewCubes={setNewCubes}
            saveCubes={saveCubes}
          />
        )}

        {startGame && (
          <>
            <GameDominos newCubes={newCubes} />
          </>
        )}
        <Ball currentItem={currentItem} />
        <Ramp currentItem={currentItem} />
        <Pipe currentItem={currentItem} />
        <Cannon currentItem={currentItem} />
        <GolfTee currentItem={currentItem} />
        <Trampoline currentItem={currentItem} />
        <GameBox
          currentItem={currentItem}
          model={"markerMan"}
          arduinoButtonPressed={arduinoButtonPressed}
        />
      </group>
    </>
  );
}
