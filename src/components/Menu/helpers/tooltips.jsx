import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";

export default function Tooltips({ currentItem }) {
  const groupRef = useRef();
  const { camera } = useThree();
  const fontUrl = "/Fonts/RobotoSlab.ttf";

  // useFrame(() => {
  //   if (groupRef.current) {
  //     groupRef.current.position.copy(camera.position);
  //     groupRef.current.rotation.copy(camera.rotation);
  //   }
  // });

  return (
    <group position={[0, 2.4, -1.5]}>
      <mesh>
        <RoundedBox args={[0.8, 1, 0.1]} radius={0.08} smoothness={2}>
          <meshStandardMaterial
            color={"#4169E1"}
            opacity={0.7}
            transparent={true}
            depthWrite={false}
          />
        </RoundedBox>
      </mesh>
      <Text
        position={[0, 0, 0]} // 1 unit in front of the camera
        fontSize={0.035}
        color="white"
        font={fontUrl}
        anchorX="center" // Horizontale Zentrierung
        anchorY="middle" // Vertikale Zentrierung
        textAlign="center"
      >
        {"Press the left trigger to select an item\n \n" +
          "Press the right trigger to spawn an item\n \n" +
          "Press and hold the right squeeze \n to change the item position\n \n" +
          "Press Y to delete an item\n \n" +
          "Press A to start the game\n \n" +
          "Press B to go back to build mode\n" +
          " \n"}
        {currentItem ? `${currentItem} selected` : "Choose an item"}
      </Text>
    </group>
  );
}
