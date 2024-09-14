import { useController, useXREvent } from "@react-three/xr";
import * as THREE from "three";
import { updatePosition, updateType } from "./update-item-position";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export function ItemSelector({ items, currentItem }) {
  const rightController = useController("right");
  const [selectedObject, setSelectedObject] = useState(null);

  function getItem() {
    switch (currentItem) {
      case "domino":
        return { item: items.domino, setItem: items.setDomino };
      case "ball":
        return { item: items.ball, setItem: items.setBall };
      case "book":
        return { item: items.book, setItem: items.setBook };
      case "pipe":
        return { item: items.pipe, setItem: items.setPipe };
      case "cannon":
        return { item: items.cannon, setItem: items.setCannon };
      case "golfTee":
        return { item: items.golfTee, setItem: items.setGolfTee };
      case "trampoline":
        return { item: items.trampoline, setItem: items.setTrampoline };
      case "arduinoBox":
        return { item: items.arduinoBox, setItem: items.setArduinoBox };
      default:
        return { item: null, setState: () => {} };
    }
  }

  //eine ItemSelector Methode anstatt es in jedem Objekt neu zu übergeben?
  //

  useXREvent(
    "squeezestart",
    () => {
      console.log("items", items);
      //items.map((cube) => console.log(cube.api.current));

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
        const intersects = raycaster.intersectObjects(
          getItem().item.map((_item) => _item.api.current),
          true
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

          const index = getItem().item.findIndex(
            (_item) => _item.api.current === firstIntersectedObject
          );

          setSelectedObject(index);
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

      getItem().setItem(
        updatePosition(getItem().item, selectedObject, newPosition, newRoation)
      );
    }
  });

  return null;
}
