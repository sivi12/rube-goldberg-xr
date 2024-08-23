import React, { useEffect, useState, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { ItemSelector } from "../../helpers/item-selcetor";
import { ObejctSpawner } from "../../helpers/item-spwaner";
import { useController, useXREvent } from "@react-three/xr";
import RemoveLastItem from "../../helpers/delete-last-item";

export function DominoModel({ position, mass, type, rotation, color, onRef }) {
  //können eigentlich die position nach dem landen speichern. Unnötig dafür game dominos zu erstellen
  //
  const [ref, api] = useBox(() => ({
    mass: mass,
    position,
    type: type,
    material: {
      friction: 0.001, // Weniger Reibung
      restitution: 0.3, // Mehr Sprungkraft
    },
    rotation: [0, rotation[1], 0],
    fixedRotation: true,
    args: [0.02, 0.2, 0.1],
    onCollide: (e) => (e.contact.impactVelocity > 0.0001 ? api.sleep() : null),
  }));

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
    if (api.rotation) {
      console.log(rotation);
      api.rotation.set(...[0, rotation[1], 0]);
    }
  }, [position, api.position, api]);
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Domino({ cubes, setCubes, currentItem }) {
  console.log(currentItem);
  return (
    <>
      <ObejctSpawner
        objects={cubes}
        setObjects={setCubes}
        model={"domino"}
        currentItem={currentItem}
      />
      <ItemSelector cubes={cubes} setCubes={setCubes} />
      {currentItem === "domino" && (
        <RemoveLastItem items={cubes} setItems={setCubes} />
      )}
    </>
  );
}

export default Domino;
