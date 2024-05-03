import React, { useMemo, useRef } from "react";
import { useTrimesh } from "@react-three/cannon";

export default function PipeModel({ _position, nodes, materials, key }) {
  // Berechnung der transformierten Geometrie mit useMemo
  const transformedGeometry = useMemo(() => {
    return nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry.scale(
      0.000025,
      0.000025,
      0.000025
    );
  }, [nodes]); // Abhängigkeit: `nodes`, da die Geometrie davon abhängt

  const [ref, api] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      position: _position,
      rotation: [Math.PI / 3, 0, 0],
      args: [
        transformedGeometry.attributes.position.array,
        transformedGeometry.index.array,
      ],
    }),
    useRef()
  );

  console.log("Geometrie: ", transformedGeometry);
  if (ref.current) {
    console.log("Ref und API: ", ref, api);
  }

  return (
    <group ref={ref} position={_position} dispose={null}>
      {" "}
      <mesh
        ref={ref}
        scale={1}
        geometry={transformedGeometry}
        material={materials.M_TrackModularHalfPipe_LOW}
      />
    </group>
  );
}

// export default function Pipe() {
//   const [cubes, setCubes] = useState([]);
//   const leftController = useController("left");

//   return (
//     <>
//       {/* <PipeSpawner
//         pipes={cubes}
//         setPipes={setCubes}
//         _controller={leftController}
//         model={"domino"}
//       /> */}
//       {/* <ObjectSelector
//         cubes={cubes}
//         setCubes={setCubes}
//         _controller={leftController}
//       /> */}
//     </>
//   );
// }
