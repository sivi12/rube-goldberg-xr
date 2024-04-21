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
import FloatingCube from "./Domino";
import getRandomColor from "./RandomColor";
import Ground from "./Ground";
import Domino from "./Domino";

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

function Ball() {
  const [spheres, setSpheres] = useState([]);
  return (
    <>
      <SphereSpawner spheres={spheres} setSpheres={setSpheres} />
      <StartGame spheres={spheres} setSpheres={setSpheres} />
    </>
  );
}

export default Ball;
