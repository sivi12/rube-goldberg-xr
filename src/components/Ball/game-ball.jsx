import { useSphere } from "@react-three/cannon";
import { SphereModel } from "./ball";

// function SphereModell({ position, color }) {
//   const [ref, api] = useSphere(() => ({
//     mass: 10,
//     position,
//     type: "Dynamic",
//     args: [0.04],
//     ccdSweptSphereRadius: 0.05,
//   }));

//   return (
//     <mesh ref={ref}>
//       <sphereGeometry args={[0.04, 16, 16]} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// }

export default function GameBalls({ saveSpheres }) {
  return (
    <>
      {saveSpheres.map((objekt, index) => (
        <SphereModel
          key={index}
          position={objekt.position}
          mass={1}
          color={objekt.color}
          onRef={(ref) => (objekt.api = ref)}
        />
      ))}
    </>
  );
}
