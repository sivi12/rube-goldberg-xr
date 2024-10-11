import { useController, useXREvent } from "@react-three/xr";
import * as THREE from "three";
import { updatePosition, updateType } from "./update-item-position";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export function ItemSelector({ items, currentItem }) {
  const rightController = useController("right");
  const [selectedObject, setSelectedObject] = useState(null);

  const allItems = items.flatMap((obj) => obj.item);

  useXREvent(
    "squeezestart",
    () => {
      if (rightController && currentItem != "" && items) {
        const tempMatrix = new THREE.Matrix4().extractRotation(
          rightController.controller.matrixWorld
        );
        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.setFromMatrixPosition(
          rightController.controller.matrixWorld
        );
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
        // items.map((cube) => console.log(cube.api.current));
        //schaue durch alle objekte des gerade auswählten items, ob der strahl einen dieser objekte trifft

        //todo er soll nichz nur durch currentItem sondern durch alle schauen
        const intersects = raycaster.intersectObjects(
          allItems.map((_item) => _item.api.current)
        );
        console.log("intersects", intersects);
        let firstIntersectedObject;
        if (intersects.length > 0) {
          if (
            currentItem === "pipe" ||
            currentItem === "golfTee" ||
            currentItem === "domino" ||
            currentItem === "cannon"
          ) {
            firstIntersectedObject = intersects[0].object.parent;
          } else {
            firstIntersectedObject = intersects[0].object;
          }

          const intersectedItem = allItems.find(
            (_item) => _item.api.current === firstIntersectedObject
          );

          const itemParentObject = items.find((obj) =>
            obj.item.includes(intersectedItem)
          );

          const index = itemParentObject?.item.findIndex(
            (_item) => _item === intersectedItem
          );

          setSelectedObject({
            index: index,
            item: itemParentObject.item,
            setItem: itemParentObject.setItem,
          });
        }
      }
    },
    { handedness: "right" }
  );

  useXREvent(
    "squeezeend",
    () => {
      setSelectedObject(null);
    },
    { handedness: "right" }
  );

  useFrame(() => {
    if (
      selectedObject !== null &&
      rightController &&
      rightController.controller
    ) {
      const newPositionX = rightController.controller.position.toArray()[0];
      const newPositionY = rightController.controller.position.toArray()[1];
      const newPositionZ = rightController.controller.position.toArray()[2];
      const newPosition = [newPositionX, newPositionY, newPositionZ];
      const newRoation = rightController.controller.rotation.toArray();

      selectedObject?.setItem(
        updatePosition(
          selectedObject.item,
          selectedObject.index,
          newPosition,
          newRoation
        )
      );
    }
  });

  return null;
}
