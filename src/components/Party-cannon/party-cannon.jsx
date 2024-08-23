import { useState } from "react";
import { ItemSpawner } from "../../helpers/item-spwaner";
import { ItemSelector } from "../../helpers/item-selcetor";
import RemoveLastItem from "../../helpers/delete-last-item";

export default function Cannon({ currentItem }) {
  const [items, setItems] = useState([]);

  return (
    <>
      <ItemSpawner
        items={items}
        setItems={setItems}
        model={"cannon"}
        currentItem={currentItem}
      />
      <ItemSelector items={items} setItems={setItems} isGLTF={true} />
      {currentItem === "cannon" && (
        <RemoveLastItem items={items} setItems={setItems} />
      )}
    </>
  );
}
