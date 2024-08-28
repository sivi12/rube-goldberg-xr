import React, { useEffect, useState } from "react";
import { MarkerManModel } from "./Marker-Man/marker-man-model";
import { GameBoxShelf } from "./game-box-shelf-model";
import ConnectToArduino from "../../helpers/connectToArduino";
import { useButton } from "../../helpers/buttons";
import { useController } from "@react-three/xr";

function GameBoxModel({ position, rotation, character, onRef, size }) {
  const [arduinoButtonPressed, setArduinoButtonPressed] = useState(false);
  const ref = React.useRef();
  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  const rightController = useController("right");
  useButton(rightController, "a", () => {
    setArduinoButtonPressed(true);
  });

  return (
    <>
      <group position={position} rotation={[0, rotation[1], 0]}>
        {/* durchsichtige Box mit ref für objektSelctor */}
        <mesh ref={ref} position={[0, -0.07, 0]}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="red" transparent={true} opacity={0.3} />
        </mesh>
        {character === "markerMan" && (
          <MarkerManModel arduinoButtonPressed={arduinoButtonPressed} />
        )}
        <GameBoxShelf
          position={position}
          rotation={[0, rotation[1], 0]}
          size={size}
        />
        <ConnectToArduino
          arduinoButtonPressed={arduinoButtonPressed}
          setArduinoButtonPressed={setArduinoButtonPressed}
        />
      </group>
    </>
  );
}

export default GameBoxModel;
