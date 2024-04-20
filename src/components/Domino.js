import { useBox } from "@react-three/cannon";

function FloatingCube({ position }) {
  const [ref] = useBox(() => ({
    mass: 0,
    position,
    onCollide: (e) => console.log(e.contact.contactPoint),
    args: [0.1, 0.1, 0.1], // Größe des Würfels
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default FloatingCube;
