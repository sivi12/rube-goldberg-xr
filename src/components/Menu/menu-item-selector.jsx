import * as THREE from "three";

export function menuItemSelector(
  refObjects,
  setCurrentItem,
  setStartGame,
  setSaveCubes,
  setNewCubes,
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

  const intersectsDomino = raycaster.intersectObject(
    refObjects.dominoRef.current,
    true
  );
  const intersectsBall = raycaster.intersectObject(
    refObjects.ballRef.current,
    true
  );

  const intersectsStartAnimation = raycaster.intersectObject(
    refObjects.startAnimationRef.current,
    true
  );
  const intersectsStartButton = raycaster.intersectObject(
    refObjects.startButtonRef.current,
    true
  );

  const intersectsBuildButton = raycaster.intersectObject(
    refObjects.buildButtonRef.current,
    true
  );
  const intersectsRamp = raycaster.intersectObject(
    refObjects.rampRef.current,
    true
  );
  const intersectsPipe = raycaster.intersectObject(
    refObjects.pipeRef.current,
    true
  );
  const intersectsCannon = raycaster.intersectObject(
    refObjects.cannonRef.current,
    true
  );

  if (intersectsDomino.length > 0) {
    console.log("Domino ausgewählt");
    setCurrentItem("domino");
  }
  if (intersectsBall.length > 0) {
    console.log("Ball ausgewählt");
    setCurrentItem("ball");
  }
  if (intersectsRamp.length > 0) {
    console.log("Rampe ausgewählt");
    setCurrentItem("ramp");
  }
  if (intersectsPipe.length > 0) {
    console.log("Pipe ausgewählt");
    setCurrentItem("pipe");
  }
  if (intersectsStartAnimation.length > 0) {
    console.log("Start Animation ausgewählt");
    setCurrentItem("startAnimation");
  }
  if (intersectsCannon.length > 0) {
    console.log("Cannon ausgewählt");
    setCurrentItem("golfTee");
  }
  if (intersectsStartButton.length > 0) {
    console.log("start ausgewählt");
    setSaveCubes(true);
    setTimeout(() => {
      setStartGame(true); // wird erst nach 0.2 sekunden gesetzt damit
    }, 200);
  }
  if (intersectsBuildButton.length > 0) {
    console.log("Build-Mode ausgewählt");
    setStartGame(false);
    setSaveCubes(false);
    setNewCubes([]);
  }
}
