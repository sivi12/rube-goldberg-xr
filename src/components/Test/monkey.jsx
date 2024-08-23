import { useGLTF } from "@react-three/drei";
import { useController } from "@react-three/xr";
import { useState } from "react";
import { ModelSpawner } from "../../helpers/model-spawner";
import { ObjectSelector } from "../../helpers/item-selcetor";

export default function Monkeyy({ nodes, _geometry }) {
  const [objects, setObjects] = useState([]);
  const _controller = useController("left");
  return (
    <>
      <ModelSpawner
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
