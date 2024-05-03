import { useTrimesh } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { MeshNormalMaterial } from "three";
import { ObjectSpawner } from "../../helpers/pipe-spawner";

export default function MonkeyModel({
  position,
  rotation,
  nodes,
  _geometry,
  onRef,
}) {
  const data1 = nodes.Suzanne_1.geometry.attributes.position.array;
  const data2 = nodes.Suzanne_1.geometry.index.array;
  const [ref, api] = useTrimesh(
    () => ({
      args: [data1, data2],
      mass: 0,
      position: position,
      rotation: rotation,
    }),
    useRef()
  );
  useEffect(() => {
    if (api.position) {
      api.position.set(...position);
    }
    if (api.rotation) {
      api.rotation.set(...rotation);
    }
  }, [position, api.position, api]);

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <group ref={ref} position={position} dispose={null}>
      <mesh
        castShadow
        geometry={_geometry}
        material={useMemo(() => new MeshNormalMaterial(), [])}
      />
    </group>
  );
}
