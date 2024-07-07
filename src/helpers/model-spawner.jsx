import { useController, useXREvent } from "@react-three/xr";
import { useState } from "react";
import MonkeyModel from "../components/Test/monkeyModel";
import { PipeModel } from "../components/Pipe/Pipe";

export function ModelSpawner({
  objects,
  setObjects,
  _controller,
  nodes,
  _geometry,
}) {
  useXREvent(
    "selectstart",
    () => {
      console.log("mira<3");
      if (_controller && _controller.controller) {
        const position = _controller.controller.position.toArray();
        const rotation = _controller.controller.rotation.toArray();
        console.log(position);
        setObjects((prevObjects) => [
          ...prevObjects,
          { position, rotation, nodes, _geometry },
        ]);
      }
    },
    { handedness: "right" }
  );

  return (
    <>
      {/* {objects.map((pipe, index) => (
        <MonkeyModel
          index={index}
          position={pipe.position}
          rotation={pipe.rotation}
          nodes={pipe.nodes}
          _geometry={pipe._geometry}
          onRef={(ref) => (pipe.api = ref)}
        />
      ))} */}
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
