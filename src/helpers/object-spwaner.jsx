import { useXREvent } from "@react-three/xr";

import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Domino/Domino";
import { RampModel } from "../components/Ramp/ramp";
import { PipeModel } from "../components/Pipe/Pipe";

export function ObejctSpawner({
  objects,
  setObjects,
  _controller,
  model,
  showObject,
  nodes,
  _geometry,
}) {
  useXREvent(
    "selectstart",
    () => {
      if (_controller && _controller.controller) {
        const position = _controller.controller.position.toArray();
        const rotationX = _controller.controller.rotation.toArray()[0];
        const rotationY = _controller.controller.rotation.toArray()[1];
        const rotationZ = _controller.controller.rotation.toArray()[2];
        // console.log(rotationX + " x");
        // console.log(rotationY + " y");
        // console.log(rotationZ + " z");

        if (model === "domino" && showObject === "domino") {
          const rotation = [0, rotationY, 0];
          const mass = 1000;
          const type = "Dynamic";
          const color = getRandomColor();
          setObjects((prevCubes) => [
            ...prevCubes,
            { position, mass, type, rotation, color },
          ]);
        }

        if (model === "ramp" && showObject === "ramp") {
          const rotation = [0, rotationY, rotationZ];
          const type = "Static";
          const color = getRandomColor();
          setObjects((prevCubes) => [
            ...prevCubes,
            { position, type, rotation, color },
          ]);
        }

        if (model === "pipe" && showObject === "pipe") {
          const rotation = [rotationX, rotationY, rotationZ];
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
        {objects.map((cube, index) => (
          <DominoModel
            key={index}
            position={cube.position}
            mass={cube.mass}
            type={cube.type}
            color={cube.color}
            rotation={cube.rotation}
            controller={_controller}
            onRef={(ref) => (cube.api = ref)}
          />
        ))}
      </>
    );
  }

  if (model === "ramp") {
    return (
      <>
        {objects.map((cube, index) => (
          <RampModel
            key={index}
            position={cube.position}
            color={cube.color}
            rotation={cube.rotation}
            onRef={(ref) => (cube.api = ref)}
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
