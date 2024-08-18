import { useXREvent, useController } from "@react-three/xr";
import { useSphere } from "@react-three/cannon";
import { useEffect, useState } from "react";
import { ObjectSelector } from "../../helpers/object-selcetor";
import { ObejctSpawner } from "../../helpers/object-spwaner";
import RemoveLastItem from "../../helpers/delete-last-object";

export function SphereModel({ position, color, mass, onRef }) {
  const [ref, api] = useSphere(() => ({
    mass: mass,
    position,
    type: "Dynamic",
    args: [0.04],
    ccdSweptSphereRadius: 0.05,
    material: {
      friction: 0.1, // Weniger Reibung
      restitution: 0.9, // Mehr Sprungkraft
    },
  }));

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  // let _mass = mass;
  // useEffect(() => {
  //   api.mass.set(mass); // Stellt sicher, dass die Masse aktualisiert wird, wenn sich die `mass` Prop ändert
  // }, [_mass]);

  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
  }, [position, api.position, api]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// function StartGame({ spheres, setSpheres, showObject }) {
//   const leftController = useController("left");

//   useXREvent(
//     "squeeze",
//     () => {
//       if (leftController && showObject === "ball" && spheres.length > 0) {
//         // setSpheres((prevSpheres) => {
//         //   return prevSpheres.map((sphere) => ({
//         //     ...sphere,
//         //     mass: 100,
//         //   }));
//         // });

//         setSpheres(spheres.slice(0, -1));
//       }
//     },
//     { handedness: "left" }
//   );
// }

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
      {showObject === "ball" && (
        <RemoveLastItem items={spheres} setItems={setSpheres} />
      )}
    </>
  );
}
