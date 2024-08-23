import { useState } from "react";
import { ItemSelector } from "../../helpers/item-selcetor";
import GameBoxSpawner from "../../helpers/gamebox-spwaner";

export function GameBox({
  currentItem,
  arduinoButtonPressed,
  model = "",
  size = [0.215, 0.115, 0.22],
}) {
  const [gameBoxItem, setGameBoxItem] = useState([]);

  return (
    <>
      {" "}
      <GameBoxSpawner
        model={model}
        gameBoxItem={gameBoxItem}
        setGameBoxItem={setGameBoxItem}
        currentItem={currentItem}
        arduinoButtonPressed={arduinoButtonPressed}
        size={size}
      />
      <ItemSelector cubes={gameBoxItem} setCubes={setGameBoxItem} />
    </>
  );
}
