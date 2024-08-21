import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useSphere, useTrimesh } from "@react-three/cannon";
import { ButtonModel } from "../physical-game-box/Button";
import { useButton } from "../../helpers/buttons";
import { useController } from "@react-three/xr";
import { applyOffset, arrowHelper, shoot } from "./helper-functions";

export function CannonModel({ onRef, position, rotation }) {
  const leftController = useController("left");
  const ref = useRef();
  const [hasColided, setHasColided] = useState(false);
  const { nodes, materials } = useGLTF("/party_cannon.glb");

  const wheelGeometry = nodes.Object_4.geometry;
  const bodyGeometry = nodes.Object_5.geometry;

  const data1 = nodes.Object_4.geometry.attributes.position.array;
  const data2 = nodes.Object_4.geometry.index.array;
  const data3 = nodes.Object_5.geometry.attributes.position.array;
  const data4 = nodes.Object_5.geometry.index.array;

  const [wheelRef, wheelApi] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      rotation,
      position,
      args: [data1, data2],
    }),
    useRef()
  );

  const [bodyRef, bodyApi] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      rotation,
      position,
      args: [data3, data4],
    }),
    useRef()
  );

  const [sphereRef, sphereApi] = useSphere(() => ({
    mass: 0,
    position,
    type: "Dynamic",
    rotation,
    args: [0.015],
  }));

  const [buttonRef, buttonApi] = useBox(() => ({
    position,
    rotation: [0, 0, 0],
    args: [0.02, 0.02, 0.02],
    //Nicht direkt hier aufrufen, da die Rotation sonst am Anfang festgelgt wird und nicht Dynamisch aktuallisiert
    onCollide: (e) => e.contact.impactVelocity > 0.0001 && setHasColided(true),
  }));

  useEffect(() => {
    if (hasColided) {
      shoot(rotation, sphereApi);
    }
  }, [hasColided]);

  useEffect(() => {
    if (bodyApi.position && wheelApi.position && sphereApi.position) {
      bodyApi.position.set(...position);
      wheelApi.position.set(...position);

      console.log(applyOffset(position, rotation, 0.1, 0.09, 0));

      sphereApi.position.set(...applyOffset(position, rotation, 0.1, 0.09, 0));

      buttonApi.position.set(
        ...applyOffset(position, rotation, -0.13, 0.009, 0)
      );
    }
    if (bodyApi.position && wheelApi.rotation) {
      bodyApi.rotation.set(rotation[0], rotation[1], rotation[2] - 3.133);
      wheelApi.rotation.set(rotation[0], rotation[1], rotation[2] - 3.133);
      sphereApi.rotation.set(...rotation);
      buttonApi.rotation.set(...rotation);
    }
    const direction = [-1, Math.tan(THREE.MathUtils.degToRad(-18)), 0];
    const arrowPosition = [0, -0.055, 0];
    bodyRef.current.add(arrowHelper(direction, arrowPosition));
  }, [position, rotation, wheelApi, bodyApi, sphereApi]);

  useButton(leftController, "x", () => shoot(rotation, sphereApi));

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <group ref={ref} dispose={null}>
      <mesh
        geometry={wheelGeometry}
        material={materials.Cannon_Wheels}
        ref={wheelRef}
      />
      <mesh
        geometry={bodyGeometry}
        material={materials.Cannon_Body}
        ref={bodyRef}
      />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color={"yellow"} />
      </mesh>
      <mesh ref={buttonRef}>
        <ButtonModel
          scale={0.01}
          rotation={[0, 0, (105 * Math.PI) / 180]}
          position={(0, 0, 0)}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/party_cannon.glb");
