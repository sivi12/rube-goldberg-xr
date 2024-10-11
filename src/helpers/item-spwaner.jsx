import { useController, useXREvent } from "@react-three/xr";
import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Domino/Domino";
import { RampModel } from "../components/Ramp/ramp";
import { PipeModel } from "../components/Pipe/Pipe";
import { SphereModel } from "../components/Ball/ball";
import { GolfTeeModel } from "../components/Golf-tee/golf-tee-model";
import { TrampolineModel } from "../components/Trampoline/trampoline-model";
import Cannon from "../components/Party-cannon/cannon";
import GameBoxModel from "../components/physical-game-box/game-box-model";
import { GameDominoModel } from "../components/Domino/game-dominos";

export function ItemSpawner({ items, currentItem, startGame }) {
  const rightController = useController("right");

  // Hilfsfunktion, um das aktuelle Item-Objekt aus `items` zu holen
  const getItemObject = (name) => items.find((obj) => obj.name === name);

  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller && !startGame) {
        const position = rightController.controller.position.toArray();
        const rotationX = rightController.controller.rotation.toArray()[0];
        const rotationY = rightController.controller.rotation.toArray()[1];
        const rotationZ = rightController.controller.rotation.toArray()[2];
        const rotation = [rotationX, rotationY, rotationZ];
        const color = getRandomColor();

        // Aktuelles Item-Objekt und Set-Funktion erhalten
        const currentItemObject = getItemObject(currentItem);

        if (currentItem === "domino") {
          const mass = 10;
          const type = "Dynamic";
          currentItemObject.setItem((prevItems) => [
            ...prevItems,
            { position, mass, type, rotation, color },
          ]);
        }

        if (currentItem === "ball") {
          const mass = 0;
          currentItemObject.setItem((prevItems) => [
            ...prevItems,
            { position, mass, color, startGame },
          ]);
        }

        if (currentItem === "book") {
          currentItemObject.setItem((prevItems) => [
            ...prevItems,
            { position, rotation, color },
          ]);
        }

        if (currentItem === "arduinoBox") {
          if (currentItemObject.item.length < 1) {
            currentItemObject.setItem((prevItems) => [
              ...prevItems,
              { position, rotation },
            ]);
          }
        }

        if (currentItem === "pipe") {
          currentItemObject.setItem((prevItems) => [
            ...prevItems,
            { position, rotation, color },
          ]);
        }

        if (currentItem === "cannon") {
          currentItemObject.setItem((prevItems) => [
            ...prevItems,
            { position, rotation },
          ]);
        }

        if (currentItem === "golfTee") {
          currentItemObject.setItem((prevItems) => [
            ...prevItems,
            { position, color },
          ]);
        }

        if (currentItem === "trampoline") {
          currentItemObject.setItem((prevItems) => [
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
      {!startGame ? (
        <>
          {getItemObject("domino").item.map((object, index) => (
            <DominoModel
              key={index}
              position={object.position}
              color={object.color}
              rotation={object.rotation}
              onRef={(ref) => (object.api = ref)}
            />
          ))}
        </>
      ) : (
        <>
          {getItemObject("domino").item.map((domino, index) => (
            <GameDominoModel
              key={index}
              position={[
                domino.api.current.matrixWorld.elements[12],
                domino.api.current.matrixWorld.elements[13],
                domino.api.current.matrixWorld.elements[14],
              ]}
              rotation={domino.rotation}
              color={domino.color}
              onRef={(ref) => (domino.api = ref)}
            />
          ))}
        </>
      )}
      <>
        {getItemObject("ball").item.map((object, index) => (
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
        {getItemObject("book").item.map((object, index) => (
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
        {getItemObject("pipe").item.map((pipe, index) => (
          <PipeModel
            key={index}
            position={pipe.position}
            rotation={pipe.rotation}
            color={pipe.color}
            onRef={(ref) => (pipe.api = ref)}
          />
        ))}
      </>
      <>
        {getItemObject("cannon").item.map((cannon, index) => (
          <Cannon
            key={index}
            position={cannon.position}
            rotation={cannon.rotation}
            startGame={startGame}
            onRef={(ref) => (cannon.api = ref)}
          />
        ))}
      </>
      <>
        {getItemObject("golfTee").item.map((golfTee, index) => (
          <GolfTeeModel
            key={index}
            position={golfTee.position}
            color={golfTee.color}
            onRef={(ref) => (golfTee.api = ref)}
          />
        ))}
      </>
      <>
        {getItemObject("trampoline").item.map((trampoline, index) => (
          <TrampolineModel
            key={index}
            position={trampoline.position}
            rotation={trampoline.rotation}
            onRef={(ref) => (trampoline.api = ref)}
          />
        ))}
      </>
      <>
        {getItemObject("arduinoBox").item.map((objekt, index) => (
          <GameBoxModel
            startGame={startGame}
            key={index}
            position={objekt.position}
            rotation={objekt.rotation}
            character={"markerMan"}
            size={[0.215, 0.115, 0.22]}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    </>
  );
}
