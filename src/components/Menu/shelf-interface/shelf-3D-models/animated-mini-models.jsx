import { useFrame, useLoader } from "@react-three/fiber";
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
  scale = [0.00055, 0.00055, 0.00055],

  position = [0, 0, 0],
}) {
  const { nodes, materials } = useGLTF("/Models/trampoline.glb");

  // useFrame((state, delta) => {
  //   if (currentItem === "trampoline") {
  //     const scaleFactor = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1; // Schwingung zwischen 0.9 und 1.1
  //     ref.current.scale.set(
  //       scale[0] * scaleFactor,
  //       scale[1] * scaleFactor,
  //       scale[2] * scaleFactor
  //     );
  //   }
  // });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={scale} position={position}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["black-rubber"]}
      />

      <mesh
        geometry={nodes.Object_3.geometry}
        material={materials["blue-plastic"]}
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
  currentItem,
}) => {
  const { nodes, materials } = useGLTF("/Models/domino.glb");
  const ref = useRef();

  // useFrame((state, delta) => {
  //   if (currentItem && currentItem === "domino") {
  //     const scaleFactor = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1; // Schwingung zwischen 0.9 und 1.1
  //     ref.current.scale.set(
  //       scale * scaleFactor,
  //       scale * scaleFactor,
  //       scale * scaleFactor
  //     );
  //   }
  // });
  return (
    <group scale={scale} position={position} rotation={rotation} ref={ref}>
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
  scale = [0.06, 0.06, 0.06],
  rotation = [0, 0, 0],
}) => {
  const { nodes, materials } = useGLTF("Models/shelf-decoration/notebook2.glb");
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

export const GolfTeeMiniModel = ({ scale, position = [0, 0, 0], rotation }) => {
  const { nodes, materials } = useGLTF("/Models/golf_tee.glb");

  return (
    <>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        position={position}
        rotation={rotation}
      />
    </>
    // <mesh position={position}>
    //   <cylinderGeometry args={[0.035, 0.035, 0.15]} />
    //   <meshStandardMaterial color="yellow" transparent={true} opacity={0.8} />
    // </mesh>
  );
};

export function CannonMiniModel({ position = [0, 0, 0] }) {
  const { nodes, materials } = useGLTF("/Models/party_cannon.glb");

  return (
    <group
      dispose={null}
      scale={0.8}
      rotation={[Math.PI, -1.2, 0]}
      position={position}
    >
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.Cannon_Wheels}
      />
      <mesh
        geometry={nodes.Object_5.geometry}
        material={materials.Cannon_Body}
      />
    </group>
  );
}
