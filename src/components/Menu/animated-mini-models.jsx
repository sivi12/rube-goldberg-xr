import { useFrame } from "@react-three/fiber";
import getRandomColor from "../RandomColor";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { DanceModel } from "../../Dance";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Models/pipe.glb");
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });
  console.log(nodes);
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

export function Modell(props) {
  const { nodes } = useGLTF("/dance.glb");
  const ref = useRef();
  console.log(nodes);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
  });

  return (
    <group {...props} dispose={null} ref={ref}>
      {/* <DanceModel /> */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MocapGuy_Body001.geometry}
        //material={materials.M_TrackModularHalfPipe_LOW}
        scale={0.08}
        position={[0, -0.1, 0]}
      />
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
