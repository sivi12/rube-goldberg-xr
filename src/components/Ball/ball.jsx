import { useXREvent, useController } from "@react-three/xr";
import { useSphere } from "@react-three/cannon";
import { useEffect, useState } from "react";
import { ItemSelector } from "../../helpers/item-selcetor";
import { ItemSpawner } from "../../helpers/item-spwaner";
import RemoveLastItem from "../../helpers/delete-last-item";

export function SphereModel({ position, color, mass, onRef, startGame }) {
  const [ref, api] = useSphere(() => ({
    mass: 0,
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
  useEffect(() => {
    if (startGame) {
      console.log(api);
      api.wakeUp();
      api.mass.set(1); // Stellt sicher, dass die Masse aktualisiert wird, wenn sich die `mass` Prop ändert
    } else {
      api.mass.set(0);
      api.sleep();
      api.position.set(...position);
    }
  }, [startGame, mass]);

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

// function StartGame({ spheres, setSpheres, currentItem }) {
//   const leftController = useController("left");

//   useXREvent(
//     "squeeze",
//     () => {
//       if (leftController && currentItem === "ball" && spheres.length > 0) {
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

export function Ball({ currentItem, startGame }) {
  const [spheres, setSpheres] = useState([]);
  return (
    <>
      <ItemSpawner
        items={spheres}
        setItems={setSpheres}
        model={"ball"}
        currentItem={currentItem}
        startGame={startGame}
      />
      <ItemSelector items={spheres} setItems={setSpheres} />
      {currentItem === "ball" && (
        <RemoveLastItem items={spheres} setItems={setSpheres} />
      )}
    </>
  );
}
