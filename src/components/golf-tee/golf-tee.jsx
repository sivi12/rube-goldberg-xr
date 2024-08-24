import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder, useTrimesh } from "@react-three/cannon";
import { ItemSpawner } from "../../helpers/item-spwaner";
import { ItemSelector } from "../../helpers/item-selcetor";
import RemoveLastItem from "../../helpers/delete-last-item";

export default function GolfTee({ currentItem }) {
  const [items, setItems] = useState([]);

  return (
    <>
      <ItemSpawner
        items={items}
        setItems={setItems}
        model={"golfTee"}
        currentItem={currentItem}
      />
      <ItemSelector items={items} setItems={setItems} isGLTF={true} />
      {currentItem === "golfTee" && (
        <RemoveLastItem items={items} setItems={setItems} />
      )}
    </>
  );
}

useGLTF.preload("/Models/golf_tee.glb");
