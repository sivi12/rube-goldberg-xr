import { useFrame } from "@react-three/fiber";
import getRandomColor from "../RandomColor";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function MiniPipe(props) {
  const { nodes, materials } = useGLTF("/Models/pipe.glb");
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
        //material={materials.M_TrackModularHalfPipe_LOW}
        scale={0.000016}
      />
    </group>
  );
}

export function MiniModel(props) {
  const { nodes } = useGLTF("/marker-man.glb");
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
        //material={materials.M_TrackModularHalfPipe_LOW}
        scale={0.08}
        position={[0, -0.1, 0]}
      />
    </group>
  );
}

export function ButtonModelAnimated(props) {
  const { nodes, materials } = useGLTF("/button.glb");
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

export const AnimatedSphere = ({ size }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshLambertMaterial color={"white"} />
    </mesh>
  );
};
