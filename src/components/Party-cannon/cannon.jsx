import { CannonModel } from "./cannon-model";
import CannonBall from "./cannon-ball";

export default function Cannon({ onRef, position, rotation, startGame }) {
  return (
    <>
      <CannonModel
        onRef={onRef}
        position={position}
        rotation={rotation}
        startGame={startGame}
      />
      {
        <CannonBall
          position={position}
          rotation={rotation}
          startGame={startGame}
        />
      }
    </>
  );
}
