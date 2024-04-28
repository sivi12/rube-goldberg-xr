import { useXREvent } from "@react-three/xr";
import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Domino";

export function DominoSpawner({ cubes, setCubes, _controller }) {
  useXREvent(
    "selectstart",
    () => {
      if (_controller && _controller.controller) {
        const position = _controller.controller.position.toArray();
        //const rotation = _controller.controller.rotation.toArray();
        const rotation = [0, 0, 0];
        // console.log(_controller.controller);
        const color = getRandomColor();
        const mass = 100;
        const type = "Dynamic";
        setCubes((prevCubes) => [
          ...prevCubes,
          { position, color, mass, type, rotation },
        ]);
      }
    },
    { handedness: "left" }
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
          onRef={(ref) => (cube.api = ref)}
        />
      ))}
    </>
  );
}
