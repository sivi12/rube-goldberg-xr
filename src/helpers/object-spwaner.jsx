import { useController, useXREvent } from "@react-three/xr";
import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Domino/Domino";
import { RampModel } from "../components/Ramp/ramp";
import { PipeModel } from "../components/Pipe/Pipe";
import { SphereModel } from "../components/Ball/ball";
import { CannonModel } from "../components/Menu/Party_cannon";

export function ObejctSpawner({
  objects,
  setObjects,
  model, // Eigentlich unnötig oder? showObejkt reicht doch aus um zu wissen welches model
  showObject,
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

        if (model === "domino" && showObject === "domino") {
          const mass = 10;
          const type = "Dynamic";
          setObjects((prevObjekts) => [
            ...prevObjekts,
            { position, mass, type, rotation, color },
          ]);
        }

        if (model === "ball" && showObject === "ball") {
          let mass = 0;
          setObjects((prevObjekts) => [
            ...prevObjekts,
            { position, mass, color },
          ]);
        }

        if (model === "ramp" && showObject === "ramp") {
          //const rampRotation = [0, rotation[1], Math.PI / 2];
          const type = "Static";
          setObjects((prevObjekts) => [
            ...prevObjekts,
            { position, type, rotation, color },
          ]);
        }

        if (model === "startBox" && showObject === "startBox") {
          setObjects((prevObjekts) => [...prevObjekts, { position, rotation }]);
        }

        if (model === "pipe" && showObject === "pipe") {
          setObjects((prevObjects) => [
            ...prevObjects,
            { position, rotation, color },
          ]);
        }

        if (model === "cannon" && showObject === "cannon") {
          setObjects((prevObjects) => [
            ...prevObjects,
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
        {objects.map((objekt, index) => (
          <DominoModel
            key={index}
            position={objekt.position}
            mass={objekt.mass}
            type={objekt.type}
            color={objekt.color}
            rotation={objekt.rotation}
            controller={rightController}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "ball") {
    return (
      <>
        {objects.map((objekt, index) => (
          <SphereModel
            key={index}
            position={objekt.position}
            mass={objekt.mass}
            color={objekt.color}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "ramp") {
    return (
      <>
        {objects.map((objekt, index) => (
          <RampModel
            key={index}
            position={objekt.position}
            color={objekt.color}
            rotation={objekt.rotation}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "pipe") {
    return (
      <>
        {" "}
        {objects.map((pipe, index) => (
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
        {objects.map((cannon, index) => (
          <CannonModel
            index={index}
            position={cannon.position}
            rotation={cannon.rotation}
            color={cannon.color}
            onRef={(ref) => (cannon.api = ref)}
          />
        ))}
      </>
    );
  }
}
