import { useState } from "react";
import { ObjectSelector } from "../../helpers/object-selcetor";
import GameBoxSpawner from "../../helpers/gamebox-spwaner";

export function GameBox({
  showObject,
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
        showObject={showObject}
        arduinoButtonPressed={arduinoButtonPressed}
        size={size}
      />
      <ObjectSelector cubes={gameBoxItem} setCubes={setGameBoxItem} />
    </>
  );
}
