import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder, useTrimesh } from "@react-three/cannon";
import { ObejctSpawner } from "../../helpers/item-spwaner";
import { ItemSelector } from "../../helpers/item-selcetor";
import RemoveLastItem from "../../helpers/delete-last-item";

export default function GolfTee({ currentItem }) {
  const [objects, setObjects] = useState([]);

  return (
    <>
      <ObejctSpawner
        objects={objects}
        setObjects={setObjects}
        model={"golfTee"}
        currentItem={currentItem}
      />
      <ItemSelector cubes={objects} setCubes={setObjects} isGLTF={true} />
      {currentItem === "golfTee" && (
        <RemoveLastItem items={objects} setItems={setObjects} />
      )}
    </>
  );
}

useGLTF.preload("/golf_tee.glb");
