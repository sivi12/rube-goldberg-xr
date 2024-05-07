import { useXREvent } from "@react-three/xr";
import { DominoModel } from "../components/Domino";
import getRandomColor from "../components/RandomColor";
import { useAButton } from "../components/a-button-pressed";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import cubeStore from "../Store/cube-store";

export const DominoSpawner = observer(({ _controller, model }) => {
  useXREvent(
    "selectstart",
    () => {
      if (_controller && _controller.controller) {
        const vectorPosition = _controller.controller.position;
        const position = [vectorPosition.x, vectorPosition.y, vectorPosition.z];
        const rotation = [0.3456789098765, 0.76989876579876, 0];
        const mass = 100;
        const type = "Dynamic";
        const color = getRandomColor();
        cubeStore.addCube({ position, rotation, mass, type, color });
        const bla = cubeStore.getCubes();
        console.log(bla[1].rotation);
        console.log(position);
      }
    },
    { handedness: "right" }
  );

  return (
    <>
      {cubeStore.getCubes().map((cube, index) => (
        <>
          {console.log(index)}
          <mesh position={[0, 0.1 + index / 10, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color={getRandomColor()} />
          </mesh>
        </>
        // <DominoModel
        //   key={index}
        //   position={[0, 1, 0]}
        //   rotation={[0, 0, 0]}
        //   mass={cube.mass}
        //   type={cube.type}
        //   color={cube.color}
        //   controller={_controller}
        //   onRef={(ref) => (cube.api = ref)}
        // />
      ))}
    </>
  );
});
