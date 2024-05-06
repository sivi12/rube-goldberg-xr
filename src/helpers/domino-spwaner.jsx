import { useXREvent } from "@react-three/xr";
import { DominoModel } from "../components/Domino";
import getRandomColor from "../components/RandomColor";

export function DominoSpawner({ cubes, setCubes, _controller, model }) {
  useXREvent(
    "selectstart",
    () => {
      if (_controller && _controller.controller) {
        const position = _controller.controller.position.toArray();
        //const rotation = _controller.controller.rotation.toArray();
        const rotation = [0, 0, 0];
        // console.log(_controller.controller);
        const mass = 100;
        const type = "Dynamic";
        const color = getRandomColor();
        setCubes((prevCubes) => [
          ...prevCubes,
          { position, mass, type, rotation, color },
        ]);
      }
    },
    { handedness: "right" }
  );

  return (
    <>
      {cubes.map((cube, index) => (
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
