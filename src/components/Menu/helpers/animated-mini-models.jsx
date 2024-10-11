import { useFrame, useLoader } from "@react-three/fiber";
import getRandomColor from "../../RandomColor";
import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";

export function MiniPipe() {
  const { nodes, materials } = useGLTF("/Models/pipe.glb");

  const newTexture = useTexture("/Textures/metal.jpg");
  const metalMaterial = new THREE.MeshStandardMaterial({ map: newTexture });

  return (
    <group rotation={[0, 0.6, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={
          nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0
            .geometry
        }
        material={metalMaterial}
        scale={0.7}
      />
    </group>
  );
}

export function TrampolineMiniModel({
  scale = [0.001, 0.001, 0.001],
  currentItem,
  position = [0, 0, 0],
  refObjects,
}) {
  const { nodes, materials } = useGLTF("/Models/trampoline.glb");
  // const ref = useRef();
  // useFrame((state, delta) => {
  //   const scaleFactor = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1; // Schwingung zwischen 0.9 und 1.1
  //   ref.current.scale.set(
  //     scale[0] * scaleFactor,
  //     scale[1] * scaleFactor,
  //     scale[2] * scaleFactor
  //   );
  // });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={scale} position={position}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["black-rubber"]}
        material-emissive={"white"}
        material-emissiveIntensity={currentItem === "trampoline" ? 0.08 : 0}
        ref={refObjects.trampolineRef}
      />

      <mesh
        geometry={nodes.Object_3.geometry}
        material={materials["blue-plastic"]}
        material-emissive={"white"}
        material-emissiveIntensity={currentItem === "trampoline" ? 0.08 : 0}
        ref={refObjects.trampolineRef}
      />
      <mesh geometry={nodes.Object_4.geometry} material={materials.metal} />
    </group>
  );
}
export function ButtonModelAnimated(props) {
  const { nodes, materials } = useGLTF("/Models/button.glb");
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <group {...props} dispose={null} ref={ref}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.23}>
        <mesh
          geometry={nodes.defaultMaterial.geometry}
          //material={materials["Material.001"]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.22}
        />
      </group>
    </group>
  );
}

export const DominoMiniModel = ({
  scale = 0.015,
  position = [0, -0.045, 0],
  rotation,
}) => {
  const { nodes, materials } = useGLTF("/Models/domino.glb");
  return (
    <group scale={scale} position={position} rotation={rotation}>
      <mesh
        geometry={nodes.Low_Domino_0.geometry}
        material={materials.Domino}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
};

export const MiniBook = ({
  scale = [0.1, 0.05, 0.1],
  rotation = [0, 0, 0],
}) => {
  const { nodes, materials } = useGLTF("/notebook2.glb");
  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.pCube1_lambert2_0.geometry}
        material={materials.lambert2}
        rotation={rotation}
        scale={scale}
      />
    </group>
  );
};

export const BallMiniModel = ({ size, position }) => {
  const texture = useLoader(TextureLoader, "/Textures/golf_ball.jpg");

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial map={texture} />
      {/* <meshStandardMaterial color={"white"} /> */}
    </mesh>
  );
};

export const GolfTeeMiniModel = ({ scale, position, rotation, refObjects }) => {
  const { nodes, materials } = useGLTF("/Models/golf_tee.glb");

  return (
    <>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        position={position}
        rotation={rotation}
        ref={refObjects.golfTeeRef}
      />
    </>
  );
};

export function CannonMiniModel({ position = [0, 0, 0], refObjects }) {
  const { nodes, materials } = useGLTF("/Models/party_cannon.glb");

  return (
    <group
      dispose={null}
      scale={1.2}
      rotation={[Math.PI, -1.4, 0]}
      position={position}
    >
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.Cannon_Wheels}
        ref={refObjects.cannonRef}
      />
      <mesh
        geometry={nodes.Object_5.geometry}
        material={materials.Cannon_Body}
        ref={refObjects.cannonRef}
      />
    </group>
  );
}
