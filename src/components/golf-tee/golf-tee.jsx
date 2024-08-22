import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder, useTrimesh } from "@react-three/cannon";
import { ObejctSpawner } from "../../helpers/object-spwaner";
import { ObjectSelector } from "../../helpers/object-selcetor";
import RemoveLastItem from "../../helpers/delete-last-object";

export default function GolfTee({ showObject }) {
  const [objects, setObjects] = useState([]);

  return (
    <>
      <ObejctSpawner
        objects={objects}
        setObjects={setObjects}
        model={"golfTee"}
        showObject={showObject}
      />
      <ObjectSelector cubes={objects} setCubes={setObjects} isGLTF={true} />
      {showObject === "golfTee" && (
        <RemoveLastItem items={objects} setItems={setObjects} />
      )}
    </>
  );
}

useGLTF.preload("/golf_tee.glb");
