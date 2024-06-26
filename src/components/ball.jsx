import { useXREvent, useController } from "@react-three/xr";
import { useSphere } from "@react-three/cannon";
import { useEffect, useState } from "react";
import getRandomColor from "./RandomColor";

function Sphere({ position, color, mass }) {
  const [ref, api] = useSphere(() => ({
    mass: mass,
    position,
    type: "Dynamic",
    args: [0.03],
    ccdSweptSphereRadius: 0.05,
  }));

  let _mass = mass;
  useEffect(() => {
    api.mass.set(mass); // Stellt sicher, dass die Masse aktualisiert wird, wenn sich die `mass` Prop ändert
  }, [_mass]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function SphereSpawner({ spheres, setSpheres, showObject }) {
  const rightController = useController("right");

  useXREvent(
    "selectstart",
    () => {
      if (rightController && showObject === "kugel") {
        const position = rightController.controller.position.toArray();
        const color = getRandomColor();
        let mass = 0;
        setSpheres([...spheres, { position, color, mass }]);
      }
    },
    { handedness: "right" }
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
    "squeeze",
    () => {
      if (rightController) {
        setSpheres((prevSpheres) => {
          return prevSpheres.map((sphere) => ({
            ...sphere,
            mass: 100,
          }));
        });
      }
    },
    { handedness: "right" }
  );
}

function Ball({ spheres, setSpheres, showObject }) {
  return (
    <>
      <SphereSpawner
        spheres={spheres}
        setSpheres={setSpheres}
        showObject={showObject}
      />
      <StartGame spheres={spheres} setSpheres={setSpheres} />
    </>
  );
}

export default Ball;
