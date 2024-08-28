import React, { useEffect, useState, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { ItemSelector } from "../../helpers/item-selcetor";
import { ItemSpawner } from "../../helpers/item-spwaner";
import { useController, useXREvent } from "@react-three/xr";
import RemoveLastItem from "../../helpers/delete-last-item";
import { useGLTF } from "@react-three/drei";

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
    args: [0.026, 0.205, 0.103],
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

  const { nodes, materials } = useGLTF("/Models/domino.glb");
  return (
    <group scale={0.04} ref={ref}>
      <mesh
        geometry={nodes.Low_Domino_0.geometry}
        material={materials.Domino}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={100}
        position={[0, -2.5, 0]}
      />
    </group>
  );
}

function Domino({ items, setItems, currentItem, startGame }) {
  console.log(currentItem);
  return (
    <>
      <ItemSpawner
        items={items}
        setItems={setItems}
        model={"domino"}
        currentItem={currentItem}
        startGame={startGame}
      />
      <ItemSelector items={items} setItems={setItems} />
      {currentItem === "domino" && (
        <RemoveLastItem items={items} setItems={setItems} />
      )}
    </>
  );
}

export default Domino;
