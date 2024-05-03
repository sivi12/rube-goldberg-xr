import { useGLTF } from "@react-three/drei";
import { useController } from "@react-three/xr";
import { useState } from "react";
import { ObjectSpawner } from "../../helpers/pipe-spawner";
import { ObjectSelector } from "../../helpers/object-selcetor";

export default function Monkeyy({ nodes, _geometry }) {
  const [objects, setObjects] = useState([]);
  const _controller = useController("left");
  return (
    <>
      <ObjectSpawner
        objects={objects}
        setObjects={setObjects}
        _controller={_controller}
        nodes={nodes}
        _geometry={_geometry}
      />
      <ObjectSelector
        cubes={objects}
        setCubes={setObjects}
        _controller={_controller}
      />
    </>
  );
}
