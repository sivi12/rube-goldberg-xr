import { useController, useXREvent } from "@react-three/xr";
import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Domino/Domino";
import { RampModel } from "../components/Ramp/ramp";
import { PipeModel } from "../components/Pipe/Pipe";
import { SphereModel } from "../components/Ball/ball";

export function ObejctSpawner({
  objects,
  setObjects,
  model, // Eigentlich unnötig oder? showObejkt reicht doch aus um zu wissen welches model
  showObject,
  nodes,
  _geometry,
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
          const mass = 0.001;
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
          const type = "Static";
          setObjects((prevObjekts) => [
            ...prevObjekts,
            { position, type, rotation, color },
          ]);
        }

        if (model === "pipe" && showObject === "pipe") {
          setObjects((prevObjects) => [
            ...prevObjects,
            { position, rotation, nodes, _geometry },
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
            nodes={pipe.nodes}
            geometry={pipe._geometry}
            onRef={(ref) => (pipe.api = ref)}
          />
        ))}
      </>
    );
  }
}
