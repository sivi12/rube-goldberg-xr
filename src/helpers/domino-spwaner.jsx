import { useXREvent } from "@react-three/xr";
import { DominoModel } from "../components/Domino";

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
        setCubes((prevCubes) => [
          ...prevCubes,
          { position, mass, type, rotation },
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
          rotation={cube.rotation}
          onRef={(ref) => (cube.api = ref)}
        />
      ))}
    </>
  );
}
