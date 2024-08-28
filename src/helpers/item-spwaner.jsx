import { useController, useXREvent } from "@react-three/xr";
import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Domino/Domino";
import { RampModel } from "../components/Ramp/ramp";
import { PipeModel } from "../components/Pipe/Pipe";
import { SphereModel } from "../components/Ball/ball";
import { CannonModel } from "../components/Party-cannon/party-cannon-model";
import { GolfTeeModel } from "../components/Golf-tee/golf-tee-model";
import { TrampolineModel } from "../components/Trampoline/trampoline-model";
import GameBoxModel from "../components/physical-game-box/game-box-model";

export function ItemSpawner({
  items,
  character, // Eigentlich unnötig oder? showObejkt reicht doch aus um zu wissen welches model
  currentItem,
  startGame,
}) {
  const rightController = useController("right");
  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller) {
        const position = rightController.controller.position.toArray();
        const rotationX = rightController.controller.rotation.toArray()[0];
        const rotationY = rightController.controller.rotation.toArray()[1];
        const rotationZ = rightController.controller.rotation.toArray()[2];
        const rotation = [rotationX, rotationY, rotationZ];
        const color = getRandomColor();

        if (currentItem === "domino") {
          const mass = 10;
          const type = "Dynamic";
          items.setDomino((prevItems) => [
            ...prevItems,
            { position, mass, type, rotation, color },
          ]);
        }

        if (currentItem === "ball") {
          let mass = 0;
          items.setBall((prevItems) => [
            ...prevItems,
            { position, mass, color, startGame },
          ]);
        }

        if (currentItem === "book") {
          //const rampRotation = [0, rotation[1], Math.PI / 2];
          const type = "Static";
          items.setBook((prevItems) => [
            ...prevItems,
            //------------------------------------------type rauslöschen
            { position, rotation, color },
          ]);
        }

        if (currentItem === "arduinoBox" && character != "") {
          if (items.arduinoBox.length < 3) {
            items.setArduinoBox((prevItems) => [
              ...prevItems,
              { position, rotation },
            ]);
          }
        }

        if (currentItem === "pipe") {
          items.setPipe((prevItems) => [
            ...prevItems,
            { position, rotation, color },
          ]);
        }

        if (currentItem === "cannon") {
          items.setCannon((prevItems) => [
            ...prevItems,
            { position, rotation },
          ]);
        }

        if (currentItem === "golfTee") {
          items.setGolfTee((prevItems) => [...prevItems, { position, color }]);
        }

        if (currentItem === "trampoline") {
          items.setTrampoline((prevItems) => [
            ...prevItems,
            { position, rotation, color },
          ]);
        }
      }
    },
    { handedness: "right" }
  );

  return (
    <>
      <>
        {items.domino.map((object, index) => (
          <DominoModel
            key={index}
            position={object.position}
            mass={object.mass}
            type={object.type}
            color={object.color}
            rotation={object.rotation}
            controller={rightController}
            onRef={(ref) => (object.api = ref)}
          />
        ))}
      </>
      <>
        {items.ball.map((object, index) => (
          <SphereModel
            key={index}
            position={object.position}
            mass={object.mass}
            color={object.color}
            startGame={startGame}
            onRef={(ref) => (object.api = ref)}
          />
        ))}
      </>
      <>
        {items.book.map((object, index) => (
          <RampModel
            key={index}
            position={object.position}
            color={object.color}
            rotation={object.rotation}
            onRef={(ref) => (object.api = ref)}
          />
        ))}
      </>
      <>
        {" "}
        {items.pipe.map((pipe, index) => (
          <PipeModel
            index={index}
            position={pipe.position}
            rotation={pipe.rotation}
            color={pipe.color}
            onRef={(ref) => (pipe.api = ref)}
          />
        ))}
      </>
      <>
        {" "}
        {items.cannon.map((cannon, index) => (
          <CannonModel
            index={index}
            position={cannon.position}
            rotation={cannon.rotation}
            onRef={(ref) => (cannon.api = ref)}
          />
        ))}
      </>
      <>
        {" "}
        {items.golfTee.map((golfTee, index) => (
          <GolfTeeModel
            index={index}
            position={golfTee.position}
            color={golfTee.color}
            onRef={(ref) => (golfTee.api = ref)}
          />
        ))}
      </>
      <>
        {" "}
        {items.trampoline.map((golfTee, index) => (
          <TrampolineModel
            index={index}
            position={golfTee.position}
            rotation={golfTee.rotation}
            onRef={(ref) => (golfTee.api = ref)}
          />
        ))}
      </>
      <>
        {items.arduinoBox.map((objekt, index) => (
          <GameBoxModel
            key={index}
            position={objekt.position}
            rotation={objekt.rotation}
            character={character}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    </>
  );
}
