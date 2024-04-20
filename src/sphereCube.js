import { Canvas, useLoader } from "@react-three/fiber";
import {
  XR,
  Controllers,
  useXREvent,
  useController,
  ARButton,
} from "@react-three/xr";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { useState, useMemo, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

function Model({ position, scale }) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/Kaktus.gltf");

  return <primitive object={scene} position={position} scale={scale} />;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function SphereSpawner() {
  const [spheres, setSpheres] = useState([]);
  const sphereCount = useRef(0); // Zähler für die Kugeln

  const leftController = useController("left");

  useXREvent("selectstart", () => {
    if (leftController) {
      const position = leftController.controller.position.toArray();
      const color = getRandomColor();
      // Aktualisieren des Zählers
      sphereCount.current += 1;
      console.log(sphereCount);
      const mass = sphereCount.current % 2 === 0 ? 1 : 0; // Wechselt die Masse zwischen 1 und 0
      setSpheres([...spheres, { position, color, mass }]);
    }
  });

  return (
    <>
      {spheres.map((sphere, index) => (
        <Sphere
          key={index}
          position={sphere.position}
          color={sphere.color}
          mass={sphere.mass}
        />
      ))}
    </>
  );
}

function Sphere({ position, color, mass }) {
  const [ref] = useSphere(() => ({
    mass: mass,
    position,
    args: [0.05],
  }));

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Ground() {
  // Ein Boden, der nicht bewegt wird (mass = 0)
  const [ref] = useBox(() => ({
    mass: 0,
    position: [0, -1, 0],
    args: [10, 1, 10],
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function SphereCube() {
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
            <SphereSpawner />
          </Physics>
          {/* <Model position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} /> */}
        </XR>
      </Canvas>
    </>
  );
}

export default SphereCube;
