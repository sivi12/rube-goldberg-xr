import { useFrame } from "@react-three/fiber";
import getRandomColor from "../RandomColor";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Models/pipe.glb");
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

export const AnimatedCube = ({ size }) => {
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

export const AnimatedSphere = ({ size }) => {
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
