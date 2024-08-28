import { useController, useXREvent } from "@react-three/xr";
import { useRef, useState } from "react";
import Domino from "../Domino/Domino";
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
import { menuItemSelector } from "./helpers/menu-item-selector";
import MenuInterface from "./menu-interface";
import MenuInterfacee from "./menu-interfacee";
import ShelfInterface from "./shelf-interface/shelf-interface";
import Tooltips from "./helpers/tooltips";
import { ItemSpawner } from "../../helpers/item-spwaner";
import { ItemSelector } from "../../helpers/item-selcetor";
import RemoveLastItem from "../../helpers/delete-last-item";

export default function MenuButton({}) {
  const leftController = useController("left");
  const rightController = useController("right");

  const [currentItem, setCurrentItem] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [saveCubes, setSaveCubes] = useState(false);
  const [newCubes, setNewCubes] = useState([]);

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

  const [domino, setDomino] = useState([]);
  const [ball, setBall] = useState([]);
  const [book, setBook] = useState([]);
  const [pipe, setPipe] = useState([]);
  const [cannon, setCannon] = useState([]);
  const [golfTee, setGolfTee] = useState([]);
  const [trampoline, setTrampoline] = useState([]);
  const [arduinoBox, setArduinoBox] = useState([]);

  const items = {
    domino: domino,
    setDomino: setDomino,
    ball: ball,
    setBall: setBall,
    book: book,
    setBook: setBook,
    pipe: pipe,
    setPipe: setPipe,
    cannon: cannon,
    setCannon: setCannon,
    golfTee: golfTee,
    setGolfTee: setGolfTee,
    trampoline: trampoline,
    setTrampoline: setTrampoline,
    arduinoBox: arduinoBox,
    setArduinoBox: setArduinoBox,
  };

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
        {/* {!startGame && (
          <Domino items={cubes} setItems={setCubes} currentItem={currentItem} />
        )} */}

        {/* {saveCubes && (
          <SaveGameObjects dominos={domino} setDominos={setDomino} />
        )}

        {startGame && <GameDominos newCubes={newCubes} />} */}

        {/* <Ball currentItem={currentItem} startGame={startGame} />
        <Ramp currentItem={currentItem} startGame={startGame} />
        <Pipe currentItem={currentItem} startGame={startGame} />
        <Cannon currentItem={currentItem} startGame={startGame} />
        <GolfTee currentItem={currentItem} startGame={startGame} />
        <Trampoline currentItem={currentItem} startGame={startGame} />
        */}
        {/* <GameBox
          currentItem={currentItem}
          character={"markerMan"}
          startGame={startGame}
        /> */}
        <ItemSpawner
          items={items}
          currentItem={currentItem}
          startGame={startGame}
          character={"markerMan"}
        />
        {!startGame && <ItemSelector items={items} currentItem={currentItem} />}
        {!startGame && (
          <RemoveLastItem items={items} currentItem={currentItem} />
        )}
      </group>
    </>
  );
}
