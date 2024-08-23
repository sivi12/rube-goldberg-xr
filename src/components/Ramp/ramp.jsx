import React, { useEffect, useState, useRef } from "react";
import { useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import { ItemSelector } from "../../helpers/item-selcetor";
import { ItemSpawner } from "../../helpers/item-spwaner";
import RemoveLastItem from "../../helpers/delete-last-item";

export function RampModel({ position, rotation, color, onRef }) {
  const [ref, api] = useBox(() => ({
    mass: 100,
    position,
    type: "Static",
    rotation: rotation,
    args: [0.015, 0.3, 0.17],
  }));

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
    if (api.rotation) {
      api.rotation.set(0, rotation[1], Math.PI / 2);
    }
  }, [position, api.position, api]);
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.015, 0.3, 0.17]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Ramp({ currentItem }) {
  const [ramps, setRamps] = useState([]);
  return (
    <>
      <ItemSpawner
        items={ramps}
        setItems={setRamps}
        model={"ramp"}
        currentItem={currentItem}
      />
      <ItemSelector items={ramps} setItems={setRamps} />
      {currentItem === "ramp" && (
        <RemoveLastItem items={ramps} setItems={setRamps} />
      )}
    </>
  );
}

export default Ramp;
