import React, { useEffect, useState, useRef } from "react";
import { useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import { ObjectSelector } from "../../helpers/object-selcetor";
import { DominoSpawner } from "../../helpers/objekt-spwaner";

export function DominoModel({ position, color, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [0.1, 0.1, 0.1],
  }));
  // Store reference to the mesh for use in raycasting
  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
  }, [position, api.position]);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function CubeTest() {
  const [cubes, setCubes] = useState([]);
  const leftController = useController("left");
  const rightController = useController("right");
  return (
    <>
      <DominoSpawner
        cubes={cubes}
        setCubes={setCubes}
        _controller={rightController}
      />
      <ObjectSelector
        cubes={cubes}
        setCubes={setCubes}
        _controller={leftController}
      />
    </>
  );
}

export default CubeTest;
