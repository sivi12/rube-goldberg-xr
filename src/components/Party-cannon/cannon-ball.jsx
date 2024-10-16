import { useBox, useSphere } from "@react-three/cannon";
import React, { useEffect, useState } from "react";
import { shoot } from "./helper-functions";
import { useButton } from "../../helpers/buttons";
import { useController } from "@react-three/xr";

import { applyOffset } from "../../helpers/apply-offset";

export default function CannonBall({ position, rotation, startGame }) {
  const [hasColided, setHasColided] = useState(false);
  const leftController = useController("left");
  const [sphereRef, sphereApi] = useSphere(() => ({
    mass: 1,
    position: [0, 0, 0],
    type: "Dynamic",
    rotation,
    args: [0.015],
  }));

  useEffect(() => {
    if ((sphereApi.position && buttonApi, position)) {
      sphereApi.position.set(...applyOffset(position, rotation, 0.1, 0.09, 0));
      buttonApi.position.set(
        ...applyOffset(position, rotation, -0.13, 0.009, 0)
      );
    }

    if (sphereApi.rotation && buttonApi.rotation) {
      sphereApi.rotation.set(...rotation);
      buttonApi.rotation.set(...rotation);
    }
  }, [position, rotation]);

  useEffect(() => {
    if (!startGame) {
      sphereApi.position.set(...applyOffset(position, rotation, 0.1, 0.09, 0));
      sphereApi.sleep();
      setHasColided(false);
    }
  }, [startGame]);

  const [buttonRef, buttonApi] = useBox(() => ({
    position,
    rotation: [0, 0, 0],
    args: [0.02, 0.02, 0.02],
    //Nicht direkt hier aufrufen, da die Rotation sonst am Anfang festgelgt wird und nicht Dynamisch aktuallisiert
    onCollide: (e) => e.contact.impactVelocity > 0.0001 && setHasColided(true),
  }));

  useButton(leftController, "x", () => shoot(rotation, sphereApi, startGame));
  useEffect(() => {
    shoot(rotation, sphereApi, startGame);
  }, [hasColided]);

  return (
    <>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color={"yellow"} />
      </mesh>
      <mesh ref={buttonRef}>
        {/* <ButtonModel
          scale={0.01}
          rotation={[0, 0, (105 * Math.PI) / 180]}
          position={(0, 1, 0)}
        /> */}
      </mesh>
    </>
  );
}
