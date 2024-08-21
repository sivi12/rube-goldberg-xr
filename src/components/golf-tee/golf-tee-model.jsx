import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder, useTrimesh } from "@react-three/cannon";

export function GolfTeeModel(props) {
  const { nodes, materials } = useGLTF("/golf_tee.glb");
  const data1 = nodes.Object_2.geometry.attributes.position.array;
  const data2 = nodes.Object_2.geometry.index.array;

  const [wheelRef, wheelApi] = useTrimesh(
    () => ({
      type: "Static",
      mass: 2,
      position: [0, 0, 0],
      args: [data1, data2],
      material: {
        friction: 0.001, // Weniger Reibung
        restitution: 0,
      },
      velocity: [0, 0, 0],
    }),
    useRef()
  );

  // const [wheelRef, wheelApi] = useCylinder(
  //   () => ({
  //     type: "Static",
  //     mass: 2,
  //     position: [0, 0, 0],
  //     args: [0.05, 0.05, 0.27],
  //     material: {
  //       friction: 0.001, // Weniger Reibung
  //       restitution: 0,
  //     },
  //     velocity: [0, 0, 0],
  //   }),
  //   useRef()
  // );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export default function GolfTee({ showObject }) {
  const [objects, setObjects] = useState([]);

  return (
    <>
      <ObejctSpawner
        objects={objects}
        setObjects={setObjects}
        model={"golfTee"}
        showObject={showObject}
      />
      <ObjectSelector cubes={objects} setCubes={setObjects} isGLTF={true} />
      {showObject === "golfTee" && (
        <RemoveLastItem items={objects} setItems={setObjects} />
      )}
    </>
  );
}

useGLTF.preload("/golf_tee.glb");
