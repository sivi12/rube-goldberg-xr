import { Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useController, useXREvent } from "@react-three/xr";
import { useRef, useState } from "react";
import * as THREE from "three";
import Domino from "../Domino/Domino";
import Ball from "../ball";
import { AnimatedCube, AnimatedSphere, Model } from "./animated-mini-models";
import GameDominos from "../Domino/game-dominos";
import { useButton } from "../../helpers/buttons";
import SaveGameDominos from "../../helpers/save-game-dominos";

import Rampp from "../Ramp/ramp";
import Pipe from "../Pipe/Pipe";

export default function MenuButton({ nodes, _geometry }) {
  const leftController = useController("left");
  const [position, setMenuPoistion] = useState([0, 1.5, 0]);
  const [rotation, SetMenuRotation] = useState([0, 0, 0]);
  const [selected, setSelected] = useState(null);

  const [showObject, setShowObject] = useState("");

  const [startGame, setStartGame] = useState(false);
  const [saveCubes, setSaveCubes] = useState(false); // wird erst nach 0.3 sekunden gesetzt damit api laden kann und gleichzeitig wartet game domino 0.3 sek mit rendern

  const [cubes, setCubes] = useState([]);
  const [newCubes, setNewCubes] = useState([]);
  const [ramps, setRamps] = useState([]);
  const [spheres, setSpheres] = useState([]);

  const menuRef = useRef();
  const dominoRef = useRef();
  const kugelRef = useRef();
  const startButtonRef = useRef();
  const rampRef = useRef();
  const pipeRef = useRef();

  // const { nodes } = useGLTF("/sm_track_modular_half_pipe.glb");
  // const _geometry =
  //   nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry.scale(
  //     0.005,
  //     0.005,
  //     0.005
  //   );

  useXREvent(
    "selectstart",
    (event) => {
      if (leftController) {
        const tempMatrix = new THREE.Matrix4();
        // Raycaster Setup
        const raycaster = new THREE.Raycaster();
        tempMatrix
          .identity()
          .extractRotation(leftController.controller.matrixWorld);
        raycaster.ray.origin.setFromMatrixPosition(
          leftController.controller.matrixWorld
        );
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

        const intersectsMenu = raycaster.intersectObject(menuRef.current, true);
        const intersectsDomino = raycaster.intersectObject(
          dominoRef.current,
          true
        );
        const intersectsKugel = raycaster.intersectObject(
          kugelRef.current,
          true
        );
        const intersectsStartButton = raycaster.intersectObject(
          startButtonRef.current,
          true
        );
        const intersectsRamp = raycaster.intersectObject(rampRef.current, true);

        const intersectsPipe = raycaster.intersectObject(pipeRef.current, true);

        // if (intersectsMenu.length > 0) {
        //   console.log("Menu ausgewählt");
        //   setSelected("menu");
        //   console.log(selected);
        // }
        if (intersectsDomino.length > 0) {
          console.log("Domino ausgewählt");
          setShowObject("domino");
          // setShowDomino(true);
          // setShowKugel(false);
          // setShowRamp(false);
        }
        if (intersectsKugel.length > 0) {
          console.log("Kugel ausgewählt");
          setShowObject("kugel");
          // setShowKugel(true);
          // setShowDomino(false);
          // setShowRamp(false);
        }
        if (intersectsRamp.length > 0) {
          console.log("Rampe ausgewählt");
          setShowObject("ramp");
          // setShowRamp(true);
          // setShowDomino(false);
          // setShowKugel(false);
        }
        if (intersectsPipe.length > 0) {
          console.log("Pipe ausgewählt");
          setShowObject("pipe");
          // setShowRamp(true);
          // setShowDomino(false);
          // setShowKugel(false);
        }
        if (intersectsStartButton.length > 0) {
          console.log("start ausgewählt");
          setStartGame(true);
        }
      }
    },
    { handedness: "left" }
  );

  useXREvent(
    "selectend",
    () => {
      setSelected(null);
    },
    { handedness: "left" }
  );

  useFrame(() => {
    if (selected !== null) {
      console.log(selected);
      const newPosition = leftController.controller.position.toArray();
      const newRotation = leftController.controller.rotation.toArray();
      setMenuPoistion(newPosition);
      SetMenuRotation(newRotation);
    }
  });

  useButton(leftController, "x", () => {
    setSaveCubes(true);
    setTimeout(() => {
      setStartGame(true);
    }, 200);
  });

  useButton(leftController, "y", () => {
    setStartGame(false);
    setSaveCubes(false);
    setNewCubes([]);
  });

  return (
    <>
      <group position={position} rotation={rotation}>
        <mesh name="background" ref={menuRef}>
          <boxGeometry args={[0.6, 0.7, 0.02]} />
          <meshStandardMaterial color="royalblue" />
          <Text
            position={[0, 0.3, 0.05]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Menu
          </Text>
        </mesh>

        <mesh position={[-0.13, 0.17, 0.1]} ref={dominoRef}>
          <AnimatedCube size={[0.06, 0.1, 0.015]} />
          <Text
            position={[0, 0.08, 0.0]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Domino
          </Text>
        </mesh>

        <mesh position={[0.13, 0.17, 0.1]} ref={kugelRef}>
          <AnimatedSphere size={[]} />
          <Text
            position={[0, 0.08, 0.0]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Kugel
          </Text>
        </mesh>

        <mesh position={[0.13, 0.01, 0.1]} ref={rampRef}>
          <AnimatedCube size={[0.06, 0.1, 0.015]} />
          <Text
            position={[0, 0.08, 0.0]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Ramp
          </Text>
        </mesh>

        <mesh position={[-0.13, 0.01, 0.1]} ref={pipeRef}>
          <Model />
          <Text
            position={[0, 0.08, 0.0]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Pipe
          </Text>
        </mesh>

        <mesh position={[0, -0.275, 0.0]} name="grabPoint" ref={startButtonRef}>
          <boxGeometry args={[0.3, 0.15, 0.025]} />
          <meshStandardMaterial color="green" />
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Start Game
          </Text>
        </mesh>
      </group>
      <group>
        {!startGame && (
          <Domino cubes={cubes} setCubes={setCubes} showObject={showObject} />
        )}
        {
          <Ball
            showObject={showObject}
            spheres={spheres}
            setSpheres={setSpheres}
          />
        }
        {<Rampp ramps={ramps} setRamps={setRamps} showObject={showObject} />}
        <Pipe nodes={nodes} _geometry={_geometry} showObject={showObject} />
        {saveCubes && (
          <SaveGameDominos
            cubes={cubes}
            newCubes={newCubes}
            setNewCubes={setNewCubes}
            saveCubes={saveCubes}
          />
        )}
        {startGame && <GameDominos newCubes={newCubes} />}
        {/* andere Elemente Ihrer Komponente */}
      </group>
    </>
  );
}
