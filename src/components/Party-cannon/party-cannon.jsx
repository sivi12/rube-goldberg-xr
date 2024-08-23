import { useState } from "react";
import { ObejctSpawner } from "../../helpers/item-spwaner";
import { ItemSelector } from "../../helpers/item-selcetor";
import RemoveLastItem from "../../helpers/delete-last-item";

export default function Cannon({ currentItem }) {
  const [objects, setObjects] = useState([]);

  return (
    <>
      <ObejctSpawner
        objects={objects}
        setObjects={setObjects}
        model={"cannon"}
        currentItem={currentItem}
      />
      <ItemSelector cubes={objects} setCubes={setObjects} isGLTF={true} />
      {currentItem === "cannon" && (
        <RemoveLastItem items={objects} setItems={setObjects} />
      )}
    </>
  );
}
