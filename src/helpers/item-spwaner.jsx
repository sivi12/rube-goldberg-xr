import { useController, useXREvent } from "@react-three/xr";
import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Domino/Domino";
import { RampModel } from "../components/Ramp/ramp";
import { PipeModel } from "../components/Pipe/Pipe";
import { SphereModel } from "../components/Ball/ball";
import { CannonModel } from "../components/Party-cannon/party-cannon-model";
import { GolfTeeModel } from "../components/Golf-tee/golf-tee-model";
import { TrampolineModel } from "../components/Trampoline/trampoline-model";

export function ItemSpawner({
  items,
  setItems,
  model, // Eigentlich unnötig oder? showObejkt reicht doch aus um zu wissen welches model
  currentItem,
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

        if (model === "domino" && currentItem === "domino") {
          const mass = 10;
          const type = "Dynamic";
          setItems((prevItems) => [
            ...prevItems,
            { position, mass, type, rotation, color },
          ]);
        }

        if (model === "ball" && currentItem === "ball") {
          let mass = 0;
          setItems((prevItems) => [...prevItems, { position, mass, color }]);
        }

        if (model === "ramp" && currentItem === "ramp") {
          //const rampRotation = [0, rotation[1], Math.PI / 2];
          const type = "Static";
          setItems((prevItems) => [
            ...prevItems,
            //------------------------------------------type rauslöschen
            { position, type, rotation, color },
          ]);
        }

        if (model === "startBox" && currentItem === "startBox") {
          setItems((prevItems) => [...prevItems, { position, rotation }]);
        }

        if (model === "pipe" && currentItem === "pipe") {
          setItems((prevItems) => [
            ...prevItems,
            { position, rotation, color },
          ]);
        }

        if (model === "cannon" && currentItem === "cannon") {
          setItems((prevItems) => [...prevItems, { position, rotation }]);
        }

        if (model === "golfTee" && currentItem === "golfTee") {
          setItems((prevItems) => [...prevItems, { position, color }]);
        }

        if (model === "trampoline" && currentItem === "trampoline") {
          setItems((prevItems) => [
            ...prevItems,
            { position, rotation, color },
          ]);
        }
      }
    },
    { handedness: "right" }
  );

  if (model === "domino") {
    return (
      <>
        {items.map((object, index) => (
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
    );
  }

  if (model === "ball") {
    return (
      <>
        {items.map((object, index) => (
          <SphereModel
            key={index}
            position={object.position}
            mass={object.mass}
            color={object.color}
            onRef={(ref) => (object.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "ramp") {
    return (
      <>
        {items.map((object, index) => (
          <RampModel
            key={index}
            position={object.position}
            color={object.color}
            rotation={object.rotation}
            onRef={(ref) => (object.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "pipe") {
    return (
      <>
        {" "}
        {items.map((pipe, index) => (
          <PipeModel
            index={index}
            position={pipe.position}
            rotation={pipe.rotation}
            color={pipe.color}
            onRef={(ref) => (pipe.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "cannon") {
    return (
      <>
        {" "}
        {items.map((cannon, index) => (
          <CannonModel
            index={index}
            position={cannon.position}
            rotation={cannon.rotation}
            onRef={(ref) => (cannon.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "golfTee") {
    return (
      <>
        {" "}
        {items.map((golfTee, index) => (
          <GolfTeeModel
            index={index}
            position={golfTee.position}
            color={golfTee.color}
            onRef={(ref) => (golfTee.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "trampoline") {
    return (
      <>
        {" "}
        {items.map((golfTee, index) => (
          <TrampolineModel
            index={index}
            position={golfTee.position}
            rotation={golfTee.rotation}
            onRef={(ref) => (golfTee.api = ref)}
          />
        ))}
      </>
    );
  }
}
