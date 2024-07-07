import React, { useEffect, useState, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { ObjectSelector } from "../../helpers/object-selcetor";

import { useButton } from "../../helpers/buttons";
import { ObejctSpawner } from "../../helpers/object-spwaner";

export function DominoModel({ position, mass, type, rotation, color, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: mass,
    position,
    type: type,
    rotation: rotation,
    args: [0.02, 0.2, 0.1],
    onCollide: (e) => (e.contact.impactVelocity > 0.0001 ? api.sleep() : null),
  }));

  // useButton(controller, "a", () => {
  //   //TODO!!! NUR DER AKTUELLE DOMINO SOLLTE aufgeweckt werden --> am besten in select object
  //   api.wakeUp(ref);
  // });

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
      <boxGeometry args={[0.02, 0.2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Domino({ cubes, setCubes, showObject }) {
  return (
    <>
      <ObejctSpawner
        objects={cubes}
        setObjects={setCubes}
        model={"domino"}
        showObject={showObject}
      />
      <ObjectSelector cubes={cubes} setCubes={setCubes} />
      {}
    </>
  );
}

export default Domino;
