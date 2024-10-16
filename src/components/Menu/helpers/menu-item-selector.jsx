import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function menuItemSelector(
  refObjects,
  setCurrentItem,
  setStartGame,
  setCurrentInfo,
  leftController
) {
  const tempMatrix = new THREE.Matrix4();

  // Raycaster Setup
  const raycaster = new THREE.Raycaster();
  tempMatrix.identity().extractRotation(leftController.controller.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(
    leftController.controller.matrixWorld
  );
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  // Alle Objektreferenzen in ein Array mit Namen umwandeln
  const objectsToCheck = [
    {
      ref: refObjects.dominoRef,
      name: "domino",
      action: () => setCurrentItem("domino"),
    },
    {
      ref: refObjects.ballRef,
      name: "ball",
      action: () => setCurrentItem("ball"),
    },
    {
      ref: refObjects.rampRef,
      name: "book",
      action: () => setCurrentItem("book"),
    },
    {
      ref: refObjects.pipeRef,
      name: "pipe",
      action: () => setCurrentItem("pipe"),
    },
    {
      ref: refObjects.startAnimationRef,
      name: "arduinoBox",
      action: () => setCurrentItem("arduinoBox"),
    },
    {
      ref: refObjects.cannonRef,
      name: "cannon",
      action: () => setCurrentItem("cannon"),
    },
    {
      ref: refObjects.trampolineRef,
      name: "trampoline",
      action: () => setCurrentItem("trampoline"),
    },
    {
      ref: refObjects.golfTeeRef,
      name: "golfTee",
      action: () => setCurrentItem("golfTee"),
    },
    {
      ref: refObjects.startButtonRef,
      name: "start",
      action: () => setStartGame(true),
    },
    {
      ref: refObjects.buildButtonRef,
      name: "build",
      action: () => setStartGame(false),
    },
  ];

  // Prüfe für jedes Objekt, ob es mit dem Raycaster kollidiert
  objectsToCheck.forEach(({ ref, name, action }) => {
    if (ref.current) {
      const intersects = raycaster.intersectObject(ref.current, true);
      if (intersects.length > 0 && intersects[0].object.name !== "info") {
        console.log(intersects);
        console.log(`${name} ausgewählt`);
        action(); // Führt die spezifische Aktion für das Objekt aus
        setCurrentInfo("gameManual");
      }
      if (intersects[0]?.object.name.slice(-4) === "Info") {
        setCurrentInfo(intersects[0]?.object.name);
      }
    }
  });
}
