import React, { useEffect } from "react";
import { MarkerManModel } from "./Marker-Man/marker-man-model";
import { GameBoxShelf } from "./game-box-shelf-model";

function GameBoxModel({
  position,
  rotation,
  model,
  arduinoButtonPressed,
  onRef,
  size,
}) {
  const ref = React.useRef();
  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  return (
    <>
      <group position={position} rotation={[0, rotation[1], 0]}>
        {/* durchsichtige Box mit ref für objektSelctor */}
        <mesh ref={ref} position={[0, -0.07, 0]}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="red" transparent={true} opacity={0.3} />
        </mesh>
        {model === "markerMan" && (
          <MarkerManModel arduinoButtonPressed={arduinoButtonPressed} />
        )}
        <GameBoxShelf
          position={position}
          rotation={[0, rotation[1], 0]}
          size={size}
        />
      </group>
    </>
  );
}

export default GameBoxModel;
