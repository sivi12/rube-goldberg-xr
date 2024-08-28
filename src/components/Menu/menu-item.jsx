import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { Box, RoundedBox, Text } from "@react-three/drei";
import { BallMiniModel } from "./helpers/animated-mini-models";

function MenuItem({
  ref,
  AnimatedMiniModel,
  position,
  color,
  label,
  size = [0.2, 0.2, 0.2],
  textPosition = [0, -0.065, 0.07],
  fontSize = 0.03,
}) {
  return (
    <group position={position}>
      <RoundedBox args={size} radius={0.04} smoothness={4} ref={ref}>
        {AnimatedMiniModel && <AnimatedMiniModel size={[0.06, 0.1, 0.015]} />}
        <meshStandardMaterial
          color={color}
          opacity={0.5}
          transparent={true}
          depthWrite={false}
        />
      </RoundedBox>
      <Text position={textPosition} fontSize={fontSize} color="white">
        {label}
      </Text>
    </group>
  );
}

export default MenuItem;
