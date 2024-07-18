import React, { useEffect, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import AnimationSpwaner from "./helpers/animation-spwaner.jsx";
import { ObjectSelector } from "./helpers/object-selcetor.jsx";
import { AnimationGrabber } from "./helpers/animation-grabber.jsx";

export function DanceModel({
  position,
  rotation = [Math.PI / 2, 0, 0],
  onRef,
}) {
  const group = React.useRef();
  const ref = React.useRef();
  const { scene, animations: loadedAnimations } = useGLTF("/dance.glb");
  //console.log("Loaded animations:", loadedAnimations);

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(loadedAnimations, group);

  useEffect(() => {
    if (actions) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions]);

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <mesh>
      <group ref={group} dispose={null}>
        <group name="Scene" position={position}>
          <group
            name="MocapGuy_HiRes_Meshes"
            rotation={rotation}
            scale={0.01}
          />
          <group name="Armature" rotation={rotation} scale={0.003}>
            <primitive object={nodes.mixamorigHips} />
            <group name="MocapGuy_Body">
              <skinnedMesh
                name="MocapGuy_Body001"
                geometry={nodes.MocapGuy_Body001.geometry}
                material={materials["Body_MAT.001"]}
                skeleton={nodes.MocapGuy_Body001.skeleton}
              />
              <skinnedMesh
                name="MocapGuy_Body001_1"
                geometry={nodes.MocapGuy_Body001_1.geometry}
                material={materials["Reflectors.001"]}
                skeleton={nodes.MocapGuy_Body001_1.skeleton}
              />
            </group>
            <skinnedMesh
              name="MocapGuy_BrowsLashes"
              geometry={nodes.MocapGuy_BrowsLashes.geometry}
              material={materials["Brows_MAT.001"]}
              skeleton={nodes.MocapGuy_BrowsLashes.skeleton}
            />
            <skinnedMesh
              name="MocapGuy_Caruncula"
              geometry={nodes.MocapGuy_Caruncula.geometry}
              material={materials["Body_MAT.001"]}
              skeleton={nodes.MocapGuy_Caruncula.skeleton}
            />
            <skinnedMesh
              name="MocapGuy_Eyes"
              geometry={nodes.MocapGuy_Eyes.geometry}
              material={materials["Eyes_MAT.001"]}
              skeleton={nodes.MocapGuy_Eyes.skeleton}
            />
            <group name="MocapGuy_Hat">
              <skinnedMesh
                name="MocapGuy_Hat001"
                geometry={nodes.MocapGuy_Hat001.geometry}
                material={materials["Body_MAT.001"]}
                skeleton={nodes.MocapGuy_Hat001.skeleton}
              />
              <skinnedMesh
                name="MocapGuy_Hat001_1"
                geometry={nodes.MocapGuy_Hat001_1.geometry}
                material={materials["Reflectors.001"]}
                skeleton={nodes.MocapGuy_Hat001_1.skeleton}
              />
            </group>
            <skinnedMesh
              name="MocapGuy_Teeth"
              geometry={nodes.MocapGuy_Teeth.geometry}
              material={materials["Body_MAT.001"]}
              skeleton={nodes.MocapGuy_Teeth.skeleton}
            />
          </group>

          <mesh position={[0, -0.05, 0]} ref={ref} rotation={rotation}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="blue" transparent opacity={0.5} />
          </mesh>
        </group>
      </group>
    </mesh>
  );
}

useGLTF.preload("dance.glb");

export function Dance({ showObject }) {
  const [animationObjekt, setAnimationObjekt] = useState([]);

  return (
    <>
      {" "}
      <AnimationSpwaner
        model={"startAnimation"}
        animationObjekt={animationObjekt}
        setAnimationObjekt={setAnimationObjekt}
        showObject={showObject}
      />
      <ObjectSelector cubes={animationObjekt} setCubes={setAnimationObjekt} />
    </>
  );
}
