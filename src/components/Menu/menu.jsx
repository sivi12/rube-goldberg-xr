import { useController, useXREvent } from "@react-three/xr";
import { useRef, useState } from "react";
import { useButton } from "../../helpers/buttons";
import { menuItemSelector } from "./helpers/menu-item-selector";
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

  // TODO-------<-------<----- items in extra file packen und nur getItem statt Items in die Funktion übergeben
  const items = [
    { name: "domino", item: domino, setItem: setDomino },
    { name: "ball", item: ball, setItem: setBall },
    { name: "book", item: book, setItem: setBook },
    { name: "pipe", item: pipe, setItem: setPipe },
    { name: "cannon", item: cannon, setItem: setCannon },
    { name: "golfTee", item: golfTee, setItem: setGolfTee },
    { name: "trampoline", item: trampoline, setItem: setTrampoline },
    { name: "arduinoBox", item: arduinoBox, setItem: setArduinoBox },
  ];

  // function getItem() {
  //   const foundItem = items.find((obj) => obj.name === currentItem);
  //   return foundItem
  //     ? { item: foundItem.item, setItem: foundItem.setItem }
  //     : { item: null, setItem: () => {} };
  // }

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
          leftController
        );
      }
    },
    { handedness: "left" }
  );

  useButton(rightController, "a", () => {
    setStartGame(true); // wird erst nach 0.2 sekunden gesetzt damit
  });

  useButton(rightController, "b", () => {
    setStartGame(false);
  });

  return (
    <>
      <ShelfInterface refObjects={refObjects} currentItem={currentItem} />
      <Tooltips currentItem={currentItem} />
      <group>
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
