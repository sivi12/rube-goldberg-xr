import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef } from "react";
import { ARButton, XR } from "@react-three/xr";

const Cube = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const AnimatedCube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

function App() {
  return (
    <>
      {" "}
      <ARButton />
      <Canvas>
        <XR>
          <directionalLight position={[0, 0, 2]} intensity={1.9} />
          <group position={[0, -1.5, -0.5]}>
            <AnimatedCube position={[0, 0, 0]} side={[1, 1, 1]} color={"red"} />
          </group>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
