import { useController, useXREvent } from "@react-three/xr";
import { useRef, useState } from "react";
import Domino from "../Domino/Domino";
import GameDominos from "../Domino/game-dominos";
import { useButton } from "../../helpers/buttons";
import updateDominoPosition from "../../helpers/save-game-dominos";
import Ramp from "../Ramp/ramp";
import Pipe from "../Pipe/Pipe";
import { Ball } from "../Ball/ball";
import { GameBox } from "../physical-game-box/game-box";
import Cannon from "../Party-cannon/party-cannon";
import Trampoline from "../Trampoline/trampoline";
import GolfTee from "../Golf-tee/golf-tee";
import { menuItemSelector } from "./menu-item-selector";
import MenuInterface from "./menu-interface";
import MenuInterfacee from "./menu-interfacee";
import ShelfInterface from "./shelf-interface/shelf-interface";
import Tooltips from "./helpers/tooltips";

export default function MenuButton({}) {
  const leftController = useController("left");
  const rightController = useController("right");

  const [currentItem, setCurrentItem] = useState(""); //Umbenennen in currentObjekt, da showObjekt nicht passend ist
  const [startGame, setStartGame] = useState(false);
  const [saveCubes, setSaveCubes] = useState(false);
  const [cubes, setCubes] = useState([]);
  const [newCubes, setNewCubes] = useState([]);
  const [arduinoButtonPressed, setArduinoButtonPressed] = useState(false);

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
      <ShelfInterface refObjects={refObjects} />
      <Tooltips currentItem={currentItem} />
      <group>
        {/* <ConnectToArduino
          arduinoButtonPressed={arduinoButtonPressed}
          setArduinoButtonPressed={setArduinoButtonPressed}
        /> */}
        {!startGame && (
          <Domino items={cubes} setItems={setCubes} currentItem={currentItem} />
        )}

        {saveCubes && (
          <updateDominoPosition cubes={cubes} setNewCubes={setNewCubes} />
        )}

        {startGame && <GameDominos newCubes={newCubes} />}

        <Ball currentItem={currentItem} startGame={startGame} />
        <Ramp currentItem={currentItem} startGame={startGame} />
        <Pipe currentItem={currentItem} startGame={startGame} />
        <Cannon currentItem={currentItem} startGame={startGame} />
        <GolfTee currentItem={currentItem} startGame={startGame} />
        <Trampoline currentItem={currentItem} startGame={startGame} />
        <GameBox
          currentItem={currentItem}
          model={"markerMan"}
          arduinoButtonPressed={arduinoButtonPressed}
          startGame={startGame}
        />
      </group>
    </>
  );
}
