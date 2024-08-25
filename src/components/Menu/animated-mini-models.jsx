import { useFrame, useLoader } from "@react-three/fiber";
import getRandomColor from "../RandomColor";
import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";

export function MiniPipe(props) {
  const { nodes, materials } = useGLTF("/Models/pipe.glb");

  const newTexture = useTexture("/Textures/metal.jpg");
  const metalMaterial = new THREE.MeshStandardMaterial({ map: newTexture });
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  // console.log(nodes);
  return (
    <group {...props} dispose={null} ref={ref}>
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

export function MiniModel(props) {
  const { nodes, materials } = useGLTF("/Models/marker-man.glb");
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MocapGuy_Body_1.geometry}
        material={materials.Body_MAT}
        scale={0.08}
        position={[0, -0.1, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MocapGuy_Body_1.geometry}
        material={materials.Body_MAT}
        scale={0.08}
        position={[0, -0.1, 0]}
      />
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

export const AnimatedCube = ({ size }) => {
  const texture = useLoader(TextureLoader, "/Textures/1.png");
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
};

export const MiniBook = ({ size }) => {
  const { nodes, materials } = useGLTF("/notebook2.glb");
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <group dispose={null} ref={ref}>
      <mesh
        geometry={nodes.pCube1_lambert2_0.geometry}
        material={materials.lambert2}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.035, 0.02, 0.035]}
      />
    </group>
  );
};

export const BallMiniModel = ({ size, position }) => {
  const texture = useLoader(TextureLoader, "/Textures/basketball.png");
  const ref = useRef();
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial map={texture} />
      {/* <meshStandardMaterial color={"white"} /> */}
    </mesh>
  );
};
