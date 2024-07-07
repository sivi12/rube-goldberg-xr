import { useXREvent, useController } from "@react-three/xr";
import { useSphere } from "@react-three/cannon";
import { useEffect, useState } from "react";
import { ObjectSelector } from "../../helpers/object-selcetor";
import { ObejctSpawner } from "../../helpers/object-spwaner";

export function SphereModel({ position, color, mass, onRef }) {
  const [ref, api] = useSphere(() => ({
    mass: mass,
    position,
    type: "Dynamic",
    args: [0.03],
    ccdSweptSphereRadius: 0.05,
  }));

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  let _mass = mass;
  useEffect(() => {
    api.mass.set(mass); // Stellt sicher, dass die Masse aktualisiert wird, wenn sich die `mass` Prop ändert
  }, [_mass]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
  }, [position, api.position, api]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function StartGame({ setSpheres }) {
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

export function Ball({ spheres, setSpheres, showObject }) {
  return (
    <>
      <ObejctSpawner
        objects={spheres}
        setObjects={setSpheres}
        model={"ball"}
        showObject={showObject}
      />
      <ObjectSelector cubes={spheres} setCubes={setSpheres} />
      <StartGame spheres={spheres} setSpheres={setSpheres} />
    </>
  );
}
