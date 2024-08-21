import { useState } from "react";
import { ObejctSpawner } from "../../helpers/object-spwaner";
import { ObjectSelector } from "../../helpers/object-selcetor";
import RemoveLastItem from "../../helpers/delete-last-object";

export default function Cannon({ showObject }) {
  const [objects, setObjects] = useState([]);

  return (
    <>
      <ObejctSpawner
        objects={objects}
        setObjects={setObjects}
        model={"cannon"}
        showObject={showObject}
      />
      <ObjectSelector cubes={objects} setCubes={setObjects} isGLTF={true} />
      {showObject === "cannon" && (
        <RemoveLastItem items={objects} setItems={setObjects} />
      )}
    </>
  );
}
