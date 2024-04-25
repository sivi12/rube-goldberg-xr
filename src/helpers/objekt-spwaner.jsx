import { useXREvent } from "@react-three/xr";
import getRandomColor from "../components/RandomColor";
import { DominoModel } from "../components/Test/Cube";

export function DominoSpawner({ cubes, setCubes, _controller }) {
  useXREvent(
    "selectstart",
    () => {
      if (_controller && _controller.controller) {
        const position = _controller.controller.position.toArray();
        const color = getRandomColor();

        setCubes((prevCubes) => [...prevCubes, { position, color }]);
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
          color={cube.color}
          onRef={(ref) => (cube.api = ref)}
        />
      ))}
    </>
  );
}
