import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useSphere, useTrimesh } from "@react-three/cannon";
import { ObejctSpawner } from "../../helpers/object-spwaner";
import { ObjectSelector } from "../../helpers/object-selcetor";
import RemoveLastItem from "../../helpers/delete-last-object";
import { ArrowHelper } from "three";
import { ButtonModel } from "../physical-game-box/Button";
import { useButton } from "../../helpers/buttons";
import { useController } from "@react-three/xr";

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
    onCollide: (e) => e.contact.impactVelocity > 0.0001 && setHasColided(true),
  }));

  useEffect(() => {
    if (hasColided) {
      shoot();
    }
  }, [hasColided]);

  useEffect(() => {
    if (bodyApi.position && wheelApi.position && sphereApi.position) {
      bodyApi.position.set(...position);
      wheelApi.position.set(...position);

      const ballOffset = new THREE.Vector3(0.1, 0.09, 0);
      ballOffset.applyEuler(new THREE.Euler(...rotation));

      sphereApi.position.set(
        position[0] + ballOffset.x,
        position[1] + ballOffset.y,
        position[2] + ballOffset.z
      );

      const buttonOffset = new THREE.Vector3(-0.13, 0.009, 0);
      buttonOffset.applyEuler(new THREE.Euler(...rotation));

      buttonApi.position.set(
        position[0] + buttonOffset.x,
        position[1] + buttonOffset.y,
        position[2] + buttonOffset.z
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

  const arrowHelper = (arrowDirection, arrowPosition) => {
    const dir = new THREE.Vector3(
      arrowDirection[0],
      arrowDirection[1],
      arrowDirection[2]
    ).normalize();

    const arrowHelper = new ArrowHelper(
      dir,
      new THREE.Vector3(arrowPosition[0], arrowPosition[1], arrowPosition[2]),
      1,
      0xffff00
    );

    return arrowHelper;
  };

  const shoot = () => {
    console.log(buttonRef.current);
    const direction = new THREE.Vector3(
      1,
      Math.tan(THREE.MathUtils.degToRad(20)),
      0
    );
    direction.applyEuler(new THREE.Euler(...rotation));
    direction.normalize();
    sphereApi.mass.set(10);
    sphereApi.velocity.set(direction.x * 5, direction.y * 5, direction.z * 5);
  };

  useButton(leftController, "x", () => shoot());

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

export default function Cannon({ showObject }) {
  const [objects, setObjects] = useState([]);

  return (
    <>
      <ObejctSpawner
        objects={objects}
        setObjects={setObjects}
        model={"cannon"}
        showObject={showObject}
      />
      <ObjectSelector cubes={objects} setCubes={setObjects} isGLTF={true} />
      {showObject === "cannon" && (
        <RemoveLastItem items={objects} setItems={setObjects} />
      )}
    </>
  );
}

useGLTF.preload("/party_cannon.glb");
