import { useController, useXREvent } from "@react-three/xr";
import { MarkerManModel } from "../components/physical-game-box/Marker-Man/marker-man-model";
import GameBoxModel from "../components/physical-game-box/game-box-model";

function GameBoxSpawner({
  model,
  currentItem,
  gameBoxItem,
  setGameBoxItem,
  arduinoButtonPressed,
  size,
}) {
  const rightController = useController("right");
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
          currentItem === "startAnimation" &&
          gameBoxItem.length < 3
        ) {
          setGameBoxItem((prevObjects) => [
            ...prevObjects,
            { position, rotation },
          ]);
        }
      }
    },
    { handedness: "right" }
  );

  const handleReff = () => {
    if (gameBoxItem) {
      gameBoxItem.map((objekt) => console.log("hello", objekt));
    }
  };

  if (model === "markerMan") {
    handleReff();
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
