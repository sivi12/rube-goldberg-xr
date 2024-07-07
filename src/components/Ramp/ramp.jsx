import React, { useEffect, useState, useRef } from "react";
import { useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import { ObjectSelector } from "../../helpers/object-selcetor";
import { ObejctSpawner } from "../../helpers/object-spwaner";

export function RampModel({ position, rotation, color, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: 100,
    position,
    type: "Static",
    rotation: rotation,
    args: [0.015, 0.3, 0.17],
    ccdMotionThreshold: 0.1,
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
  }, [position, api.position, api]);
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.015, 0.3, 0.17]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Ramp({ showObject }) {
  const [ramps, setRamps] = useState([]);
  return (
    <>
      <ObejctSpawner
        objects={ramps}
        setObjects={setRamps}
        model={"ramp"}
        showObject={showObject}
      />
      <ObjectSelector cubes={ramps} setCubes={setRamps} />
    </>
  );
}

export default Ramp;
