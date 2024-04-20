import { Canvas } from "@react-three/fiber";
import {
  XR,
  Controllers,
  useXREvent,
  useController,
  ARButton,
} from "@react-three/xr";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { useEffect, useState } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function SphereSpawner({ spheres, setSpheres }) {
  const leftController = useController("left");

  useXREvent(
    "selectstart",
    () => {
      if (leftController) {
        const position = leftController.controller.position.toArray();
        const color = getRandomColor();
        let mass = 0;
        setSpheres([...spheres, { position, color, mass }]);
      }
    },
    { handedness: "left" }
  );

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

function StartGame({ spheres, setSpheres }) {
  const rightController = useController("right");

  useXREvent(
    "selectstart",
    () => {
      if (rightController) {
        setSpheres((prevSpheres) => {
          return prevSpheres.map((sphere) => ({
            ...sphere,
            mass: 1,
          }));
        });
      }
    },
    { handedness: "right" }
  );
}

function Sphere({ position, color, mass }) {
  let _mass = mass;
  const [ref, api] = useSphere(() => ({
    mass: mass,
    position,
    type: "Dynamic",
    args: [0.05],
  }));

  useEffect(() => {
    api.mass.set(mass); // Stellt sicher, dass die Masse aktualisiert wird, wenn sich die `mass` Prop ändert
  }, [_mass]);

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
    position: [0, 0, 0],
    args: [10, 1, 10],
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function Ball() {
  const [spheres, setSpheres] = useState([]);
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
            <SphereSpawner spheres={spheres} setSpheres={setSpheres} />
            <StartGame spheres={spheres} setSpheres={setSpheres} />
          </Physics>
          {/* <Model position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} /> */}
        </XR>
      </Canvas>
    </>
  );
}

export default Ball;
