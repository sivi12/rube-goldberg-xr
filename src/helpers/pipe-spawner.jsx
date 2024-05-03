import { useController, useXREvent } from "@react-three/xr";
import { useState } from "react";
import MonkeyModel from "../components/Test/monkeyModel";

export function ObjectSpawner({
  objects,
  setObjects,
  _controller,
  nodes,
  _geometry,
}) {
  useXREvent(
    "selectstart",
    () => {
      if (_controller && _controller.controller) {
        const position = _controller.controller.position.toArray();
        const rotation = _controller.controller.rotation.toArray();
        setObjects((prevObjects) => [
          ...prevObjects,
          { position, rotation, nodes, _geometry },
        ]);
      }
    },
    { handedness: "left" }
  );

  return (
    <>
      {objects.map((pipe, index) => (
        <MonkeyModel
          index={index}
          position={pipe.position}
          rotation={pipe.rotation}
          nodes={pipe.nodes}
          _geometry={pipe._geometry}
          onRef={(ref) => (pipe.api = ref)}
        />
      ))}
    </>
  );
}
