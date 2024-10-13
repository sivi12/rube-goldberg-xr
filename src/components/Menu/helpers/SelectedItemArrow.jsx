import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";

export default function SelectedItemArrow({ currentItem, position }) {
  const groupRef = useRef();
  const { camera } = useThree();
  const fontUrl = "/Fonts/RobotoSlab.ttf";

  // useFrame(() => {
  //   if (groupRef.current) {
  //     groupRef.current.position.copy(camera.position);
  //     groupRef.current.rotation.copy(camera.rotation);
  //   }
  // });

  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.position.y = 0.12 + Math.sin(time * 2) * 0.01; // Basis y-Position + Sinus-Wackeln
    }
  });

  return (
    <group
      position={[position[0], position[1] + 0.1, position[2] + 0]}
      ref={ref}
    >
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.08]} />
        <meshStandardMaterial
          color={"white"}
          opacity={1}
          transparent={true}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.0, 0.02, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.025, 0.1, 8]} />{" "}
        {/* Basisradius, Höhe, Seiten */}
        <meshStandardMaterial color="white" opacity={1} transparent={true} />
      </mesh>
      <Text
        position={[0, 0.17, 0]} // 1 unit in front of the camera
        fontSize={0.02}
        color="white"
        font={fontUrl}
        anchorX="center" // Horizontale Zentrierung
        anchorY="middle" // Vertikale Zentrierung
        textAlign="center"
      >
        {/* {`${currentItem} selected`} */}
      </Text>
    </group>
  );
}
