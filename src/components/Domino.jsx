import React, { useEffect, useState } from "react";
import { useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import { ObjectSelector } from "../helpers/object-selcetor";
import { DominoSpawner } from "../helpers/domino-spwaner";
import { observer } from "mobx-react";
import { useButton } from "./a-button-pressed";
import cubeStore from "../Store/cube-store";

export function DominoModel({
  position,
  mass,
  type,
  rotation,
  color,
  controller,
  onRef,
}) {
  const [ref, api] = useBox(() => ({
    mass: mass,
    position,
    type: type,
    rotation: rotation,
    args: [0.02, 0.2, 0.1],
    onCollide: (e) => (e.contact.impactVelocity > 0.0001 ? api.sleep() : null),
  }));

  useButton(controller, "a", () => {
    //TODO!!! NUR DER AKTUELLE DOMINO SOLLTE aufgeweckt werden --> am besten in select object
    api.wakeUp(ref);
  });

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

export const Domino = observer(() => {
  const rightController = useController("right");

  return (
    <>
      <DominoSpawner _controller={rightController} model={"domino"} />
      <ObjectSelector _controller={rightController} />
      {}
    </>
  );
});

export default Domino;
