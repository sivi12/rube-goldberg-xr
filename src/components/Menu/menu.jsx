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
import { menuItemSelector } from "./menu-item-selector";
import MenuInterface from "./menu-interface";
import MenuTest from "./menu-item";
import { AnimatedSphere } from "./animated-mini-models";
import MenuInterfacee from "./menu-interfacee";

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
      <MenuInterface refObjects={refObjects} />
      <group>
        {/* <ConnectToArduino
          arduinoButtonPressed={arduinoButtonPressed}
          setArduinoButtonPressed={setArduinoButtonPressed}
        /> */}
        {!startGame && (
          <>
            <Domino
              items={cubes}
              setItems={setCubes}
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
