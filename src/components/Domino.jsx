import React, { useEffect, useState, useRef } from "react";
import { useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import { ObjectSelector } from "../helpers/object-selcetor";
import { DominoSpawner } from "../helpers/objekt-spwaner";

export function DominoModel({ position, color, mass, type, rotation, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: mass,
    position,
    type: type,
    rotation: rotation,
    args: [0.02, 0.2, 0.1],
    onCollide: (e) => (e.contact.impactVelocity > 0.001 ? api.sleep() : null),
  }));

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
    if (api.rotation) {
      api.rotation.set(...rotation);
    }

    if (type == "Static") {
      api.sleep();
    }
  }, [position, api.position, type, api]);
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Domino() {
  const [cubes, setCubes] = useState([]);
  const leftController = useController("left");

  return (
    <>
      <DominoSpawner
        cubes={cubes}
        setCubes={setCubes}
        _controller={leftController}
      />
      <ObjectSelector
        cubes={cubes}
        setCubes={setCubes}
        _controller={leftController}
      />
    </>
  );
}

export default Domino;
