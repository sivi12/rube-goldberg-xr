import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef } from "react";
import { ARButton, Controllers, XR } from "@react-three/xr";
import { Physics } from "@react-three/cannon";
import Ground from "./components/Ground";
import Ball from "./components/ball";
import Domino from "./components/Domino";

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
      <ARButton />
      <Canvas>
        <XR>
          <directionalLight position={[0, 0, 2]} intensity={1.9} />
          <ambientLight position={[0, 0, 2]} intensity={1} />
          <Controllers />
          <Physics>
            <Ground />
            <Ball />
            <Domino />
          </Physics>
          {/* <Model position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} /> */}
        </XR>
      </Canvas>
    </>
  );
}

export default App;
