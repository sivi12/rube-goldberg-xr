import { useController, useXREvent } from "@react-three/xr";
import { useRef, useState } from "react";
import { useButton } from "../../helpers/buttons";
import { menuItemSelector } from "./helpers/menu-item-selector";
import ShelfInterface from "./shelf-interface/shelf-interface";
import GameManual from "./helpers/game-manual";
import { ItemSpawner } from "../../helpers/item-spwaner";
import { ItemSelector } from "../../helpers/item-selcetor";
import RemoveLastItem from "../../helpers/delete-last-item";

export default function MenuButton({}) {
  const rightController = useController("right");

  const [currentItem, setCurrentItem] = useState("");
  const [startGame, setStartGame] = useState(false);

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

  useButton(rightController, "a", () => {
    setStartGame(true); // wird erst nach 0.2 sekunden gesetzt damit
  });

  useButton(rightController, "b", () => {
    setStartGame(false);
  });

  return (
    <>
      <ShelfInterface
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        setStartGame={setStartGame}
      />

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
