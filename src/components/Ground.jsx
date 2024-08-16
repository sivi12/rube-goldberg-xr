import { useBox, usePlane } from "@react-three/cannon";
import { useRef } from "react";

function Ground(props) {
  // Ein Boden, der nicht bewegt wird (mass = 0)
  const [ref] = usePlane(
    () => ({ mass: 0, type: "Static", position: [0, 0, 0], ...props }),
    useRef()
  );
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial color={"green"} visible={true} />
    </mesh>
  );
}

export default Ground;
