import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere, useTrimesh } from "@react-three/cannon";
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
      rotation: rotation,
      position: position,
      args: [data1, data2],
    }),
    useRef()
  );

  const [bodyRef, bodyApi] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      rotation: [rotation[0], rotation[1], rotation[2]],
      position: position,
      args: [data3, data4],
    }),
    useRef()
  );

  const [sphereRef, sphereApi] = useSphere(() => ({
    mass: 0,
    position: [position[0], position[1], position[2]],
    type: "Dynamic",
    rotation,
    args: [0.015],
  }));

  useEffect(() => {
    if (bodyApi.position && wheelApi.position && sphereApi.position) {
      bodyApi.position.set(...position);
      wheelApi.position.set(...position);

      const offset = new THREE.Vector3(0.1, 0.09, 0);
      offset.applyEuler(new THREE.Euler(...rotation));

      sphereApi.position.set(
        position[0] + offset.x,
        position[1] + offset.y,
        position[2] + offset.z
      );
    }
    if (bodyApi.position && wheelApi.rotation) {
      bodyApi.rotation.set(rotation[0], rotation[1], rotation[2] - 3.133);
      wheelApi.rotation.set(rotation[0], rotation[1], rotation[2] - 3.133);
      sphereApi.rotation.set(...rotation);
    }

    const dir = new THREE.Vector3(
      -1,
      Math.tan(THREE.MathUtils.degToRad(-18)),
      0
    ).normalize();

    const arrowHelper = new ArrowHelper(
      dir,
      new THREE.Vector3(0, -0.055, 0),
      1,
      0xffff00
    );

    bodyRef.current.add(arrowHelper);
  }, [position, rotation, wheelApi, bodyApi, sphereApi]);

  const shoot = () => {
    console.log("hiiiiiiiiii");
    const direction = new THREE.Vector3(
      1,
      Math.tan(THREE.MathUtils.degToRad(20)),
      0
    );
    direction.applyEuler(new THREE.Euler(...rotation));
    direction.normalize();
    sphereApi.mass.set(10);
    sphereApi.velocity.set(direction.x * 7, direction.y * 7, direction.z * 7);
  };

  useButton(leftController, "x", () => shoot());

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <group dispose={null}>
      <group ref={ref}>
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
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
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
