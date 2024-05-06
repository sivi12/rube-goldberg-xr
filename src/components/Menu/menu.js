import { Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useController, useXREvent } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import MonkeyModel from "../Test/monkeyModel";
import * as THREE from "three";
import getRandomColor from "../RandomColor";
import Domino from "../Domino";
import Ball from "../ball";

export default function MenuButton({ label, onClick }) {
  const leftController = useController("left");
  const [position, setPosition] = useState([0, 1.5, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [selected, setSelected] = useState(null);
  const [showDomino, setShowDomino] = useState(false);
  const [showKugel, setShowKugel] = useState(false);

  const menuRef = useRef();
  const dominoRef = useRef();
  const kugelRef = useRef();

  useXREvent("selectstart", (event) => {
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
      const intersectsKugel = raycaster.intersectObject(kugelRef.current, true);

      //   if (intersectsMenu.length > 0) {
      //     console.log("Menu ausgewählt");
      //     setSelected("menu");
      //     console.log(selected);
      //   }
      if (intersectsDomino.length > 0) {
        console.log("Domino ausgewählt");
        setShowDomino(true);
      }
      if (intersectsKugel.length > 0) {
        console.log("Kugel ausgewählt");
        setShowKugel(true);
      }
    }
  });

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
      setPosition(newPosition);
      setRotation(newRotation);
    }
  });

  return (
    <>
      <group position={position} rotation={rotation}>
        <mesh name="background" ref={menuRef}>
          <boxGeometry args={[0.6, 0.5, 0.02]} />
          <meshStandardMaterial color="royalblue" />
          <Text
            position={[0, 0.2, 0.05]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Menu
          </Text>
        </mesh>
        <mesh position={[0.27, -0.225, 0.0]} name="grabPoint">
          <boxGeometry args={[0.06, 0.05, 0.025]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
        <mesh position={[-0.13, 0.07, 0.1]} ref={dominoRef}>
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

        <mesh position={[0.13, 0.07, 0.1]} ref={kugelRef}>
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

        <mesh position={[0.13, -0.09, 0.1]}>
          <AnimatedCube size={[0.06, 0.1, 0.015]} />
          <Text
            position={[0, 0.08, 0.0]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Monkey
          </Text>
        </mesh>

        <mesh position={[-0.13, -0.09, 0.1]}>
          <Model />
          <Text
            position={[0, 0.08, 0.0]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Rampe
          </Text>
        </mesh>
      </group>
      <group>
        {showDomino && <Domino />}
        {showKugel && <Ball />}
        {/* andere Elemente Ihrer Komponente */}
      </group>
    </>
  );
}

function Model(props) {
  const { nodes, materials } = useGLTF("/sm_track_modular_half_pipe.glb");
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={
          nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0
            .geometry
        }
        material={materials.M_TrackModularHalfPipe_LOW}
        scale={0.000016}
      />
    </group>
  );
}

const AnimatedCube = ({ size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={getRandomColor()} />
    </mesh>
  );
};

const AnimatedSphere = ({ size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshLambertMaterial color={getRandomColor()} />
    </mesh>
  );
};
