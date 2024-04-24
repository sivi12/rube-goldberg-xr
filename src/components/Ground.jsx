import { useBox } from "@react-three/cannon";

function Ground() {
  // Ein Boden, der nicht bewegt wird (mass = 0)
  const [ref] = useBox(() => ({
    mass: 0,
    position: [0, 0, 0],
    args: [10, 1.1, 10],
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

export default Ground;
