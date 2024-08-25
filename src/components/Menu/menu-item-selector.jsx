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

  if (refObjects.dominoRef.current) {
    const intersectsDomino = raycaster.intersectObject(
      refObjects.dominoRef.current,
      true
    );
    if (intersectsDomino.length > 0) {
      console.log("Domino ausgewählt");
      setCurrentItem("domino");
    }
  }

  if (refObjects.ballRef.current) {
    const intersectsBall = raycaster.intersectObject(
      refObjects.ballRef.current,
      true
    );
    if (intersectsBall.length > 0) {
      console.log("Ball ausgewählt");
      setCurrentItem("ball");
    }
  }

  if (refObjects.rampRef.current) {
    const intersectsRamp = raycaster.intersectObject(
      refObjects.rampRef.current,
      true
    );
    if (intersectsRamp.length > 0) {
      console.log("Rampe ausgewählt");
      setCurrentItem("ramp");
    }
  }

  if (refObjects.pipeRef.current) {
    const intersectsPipe = raycaster.intersectObject(
      refObjects.pipeRef.current,
      true
    );
    if (intersectsPipe.length > 0) {
      console.log("Pipe ausgewählt");
      setCurrentItem("pipe");
    }
  }

  if (refObjects.startAnimationRef.current) {
    const intersectsStartAnimation = raycaster.intersectObject(
      refObjects.startAnimationRef.current,
      true
    );
    if (intersectsStartAnimation.length > 0) {
      console.log("Start Animation ausgewählt");
      setCurrentItem("startAnimation");
    }
  }

  if (refObjects.cannonRef.current) {
    const intersectsCannon = raycaster.intersectObject(
      refObjects.cannonRef.current,
      true
    );
    if (intersectsCannon.length > 0) {
      console.log("Cannon ausgewählt");
      setCurrentItem("golfTee");
    }
  }

  if (refObjects.startButtonRef.current) {
    const intersectsStartButton = raycaster.intersectObject(
      refObjects.startButtonRef.current,
      true
    );
    if (intersectsStartButton.length > 0) {
      console.log("start ausgewählt");
      setSaveCubes(true);
      setTimeout(() => {
        setStartGame(true); // wird erst nach 0.2 sekunden gesetzt damit
      }, 200);
    }
  }

  if (refObjects.buildButtonRef.current) {
    const intersectsBuildButton = raycaster.intersectObject(
      refObjects.buildButtonRef.current,
      true
    );
    if (intersectsBuildButton.length > 0) {
      console.log("Build-Mode ausgewählt");
      setStartGame(false);
      setSaveCubes(false);
      setNewCubes([]);
    }
  }
}
