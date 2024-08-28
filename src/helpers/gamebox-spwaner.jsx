import { useController, useXREvent } from "@react-three/xr";
import { MarkerManModel } from "../components/physical-game-box/Marker-Man/marker-man-model";
import GameBoxModel from "../components/physical-game-box/game-box-model";
import { useState } from "react";

function GameBoxSpawner({
  model,
  currentItem,
  gameBoxItem,
  setGameBoxItem,
  size = [0.215, 0.115, 0.22],
}) {
  const rightController = useController("right");
  const [arduinoButtonPressed, setArduinoButtonPressed] = useState(false);
  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller) {
        const position = rightController.controller.position.toArray();
        const rotation = rightController.controller.rotation.toArray();

        // const rotationZ = rightController.controller.rotation.toArray()[2];
        // const rotation = [Math.PI / 2, 0, rotation[2]];

        if (
          model != "" &&
          currentItem === "arduinoBox" &&
          gameBoxItem.length < 3
        ) {
          setGameBoxItem((prevItems) => [...prevItems, { position, rotation }]);
        }
      }
    },
    { handedness: "right" }
  );

  // const handleReff = () => {
  //   if (gameBoxItem) {
  //     gameBoxItem.map((objekt) => console.log("hello", objekt));
  //   }
  // };

  if (model === "markerMan") {
    // handleReff();
    return (
      <>
        {gameBoxItem.map((objekt, index) => (
          <GameBoxModel
            key={index}
            position={objekt.position}
            rotation={objekt.rotation}
            arduinoButtonPressed={arduinoButtonPressed}
            model={model}
            size={size}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    );
  }
}

export default GameBoxSpawner;
