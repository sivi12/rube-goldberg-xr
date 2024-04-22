import { useXREvent, useController } from "@react-three/xr";
import { useSphere } from "@react-three/cannon";
import { useState, useEffect } from "react";
import getRandomColor from "../RandomColor";

function Sphere({ position, color, index, updateSpherePosition }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    type: "Dynamic",
    args: [0.05],
  }));

  useEffect(() => {
    const unsubscribe = api.position.subscribe((newPosition) => {
      updateSpherePosition(index, newPosition);
    });

    return () => unsubscribe();
  }, [api, index, updateSpherePosition]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function SphereSpawner({ spheres, setSpheres }) {
  const leftController = useController("left");

  const updateSpherePosition = (index, newPosition) => {
    setSpheres((prevSpheres) => {
      const newSpheres = [...prevSpheres];
      newSpheres[index] = { ...newSpheres[index], position: newPosition };
      return newSpheres;
    });
  };

  useXREvent(
    "selectstart",
    () => {
      if (leftController && leftController.controller) {
        const position = leftController.controller.position.toArray();
        const color = getRandomColor();
        let mass = 0;
        setSpheres((spheres) => [...spheres, { position, color, mass }]);
      }
    },
    { handedness: "left" }
  );

  useXREvent(
    "squeezestart",
    () => {
      console.log("Current Positions of Spheres:");
      spheres.forEach((sphere, index) => {
        console.log(`Sphere ${index}:`, sphere.position);
      });
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
          index={index}
          updateSpherePosition={updateSpherePosition}
          mass={sphere.mass}
        />
      ))}
    </>
  );
}

function BallTracking() {
  const [spheres, setSpheres] = useState([]);
  return (
    <>
      <SphereSpawner spheres={spheres} setSpheres={setSpheres} />
    </>
  );
}

export default BallTracking;
